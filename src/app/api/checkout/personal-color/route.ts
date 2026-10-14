import { NextRequest } from 'next/server'
import { createCreditPackCheckout } from '@/lib/create-credit-checkout'

// Creates a Stripe Checkout session for the 150-credit pack purchase.
// Returns the hosted Checkout URL — frontend redirects to it.
//
// When the user is signed in, we lock the customer email to their session
// email so Stripe Link cannot attach the payment to a different address.
export async function POST(req: NextRequest) {
  return createCreditPackCheckout(req, {
    defaultReturnJa: '/tools/personal-color-analysis',
    defaultReturnEn: '/en/tools/personal-color-analysis',
    product: 'personal-color-pack',
  })
}
