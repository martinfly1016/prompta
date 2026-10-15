// Retired. Checkout no longer uses a pre-made Stripe Price.
// Packs are defined in src/lib/credit-costs.ts and sent as inline price_data
// (Prompta 20ポイント / Prompta 70ポイント). Running this script used to
// create the misnamed 「10回パック」 / 150-point product.

console.error(
  'This script is retired. Do not create a Stripe Price. Packs live in src/lib/credit-costs.ts and Checkout uses inline price_data.',
)
process.exit(1)
