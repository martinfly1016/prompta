import { NextRequest } from 'next/server'
import { createCreditPackCheckout } from '@/lib/create-credit-checkout'

// Same 150-credit pack as personal-color. Credits are pooled, so a buyer
// can spend them on either tool or on in-page prompt execution.
export async function POST(req: NextRequest) {
  return createCreditPackCheckout(req, {
    defaultReturnJa: '/tools/hair-color-diagnosis',
    defaultReturnEn: '/en/tools/hair-color-diagnosis',
    product: 'hair-color-pack',
  })
}
