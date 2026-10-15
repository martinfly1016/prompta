import { prisma } from '@/lib/prisma'
import { emailHash, getPaidBalance, grantCredits } from '@/lib/paid-credits'
import { sendPurchaseEmail } from '@/lib/purchase-email'

export interface FulfillInput {
  sessionId: string
  email: string
  credits: number
  amountJpy: number
  paymentIntent: string | null
  eventType: string
}

export interface FulfillResult {
  balance: number
  expiresAt: Date | null
  credits: number
  alreadyProcessed: boolean
}

// Idempotent credit grant for a paid Checkout Session. The StripePayment
// row is the lock: the first caller creates it and grants; a concurrent
// webhook or success-page confirm sees the unique sessionId and skips.
export async function fulfillPaidCheckout(input: FulfillInput): Promise<FulfillResult> {
  const email = input.email.trim().toLowerCase()
  const eh = emailHash(email)
  const credits = input.credits

  try {
    await prisma.stripePayment.create({
      data: {
        sessionId: input.sessionId,
        paymentIntent: input.paymentIntent,
        emailHash: eh,
        email,
        amountJpy: input.amountJpy,
        creditsGranted: credits,
        status: 'paid',
        rawEventType: input.eventType,
      },
    })
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code
    if (code !== 'P2002') throw e
    const balance = await getPaidBalance(eh)
    const row = await prisma.paidCredits.findUnique({
      where: { emailHash: eh },
      select: { expiresAt: true },
    })
    return {
      balance,
      expiresAt: row?.expiresAt ?? null,
      credits,
      alreadyProcessed: true,
    }
  }

  try {
    const after = await grantCredits(email, credits)
    try {
      await sendPurchaseEmail({
        email,
        creditsGranted: credits,
        balance: after.balance,
        expiresAt: after.expiresAt,
        amountJpy: input.amountJpy,
        sessionId: input.sessionId,
      })
    } catch (e: unknown) {
      console.error('[checkout fulfill] purchase email failed:', (e as Error)?.message)
    }
    return {
      balance: after.balance,
      expiresAt: after.expiresAt,
      credits,
      alreadyProcessed: false,
    }
  } catch (e) {
    await prisma.stripePayment.delete({ where: { sessionId: input.sessionId } }).catch(() => {})
    throw e
  }
}
