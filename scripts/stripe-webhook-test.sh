#!/bin/bash
# Local Stripe webhook testing helper.
#
# Workflow:
#   1. Terminal A: ./scripts/stripe-webhook-test.sh listen
#      (forwards Stripe test events to your local dev server, prints
#       a one-time `whsec_xxx` test webhook secret you must paste into
#       .env.local as STRIPE_WEBHOOK_SECRET, then restart `next dev`)
#
#   2. Terminal B: ./scripts/stripe-webhook-test.sh trigger
#      (fires a fake checkout.session.completed event with a custom
#       email + credit count — webhook handler runs end-to-end:
#       grants credits, sends purchase email, logs)
#
# Prerequisites:
#   - stripe CLI logged in to test mode: `stripe login`
#   - Local Next dev running on :3000 with STRIPE_SECRET_KEY=sk_test_...
#     and STRIPE_WEBHOOK_SECRET=whsec_<from listen step> in .env.local
#   - DATABASE_URL pointing to a NON-PROD database, OR be ok with test
#     events landing in prod DB under whatever email you pass
#
# Usage:
#   ./scripts/stripe-webhook-test.sh listen
#   ./scripts/stripe-webhook-test.sh trigger [email] [credits]

set -euo pipefail

CMD=${1:-help}

case "$CMD" in
  listen)
    echo "Forwarding Stripe test events → http://localhost:3000/api/webhooks/stripe"
    echo "Copy the whsec_xxx printed below into .env.local as STRIPE_WEBHOOK_SECRET"
    echo "Then restart next dev. Leave this terminal running."
    echo ""
    exec stripe listen --forward-to localhost:3000/api/webhooks/stripe
    ;;

  trigger)
    EMAIL=${2:-test@example.com}
    CREDITS=${3:-10}
    echo "Triggering checkout.session.completed → email=$EMAIL credits=$CREDITS"
    stripe trigger checkout.session.completed \
      --add "checkout_session:metadata[credits]=$CREDITS" \
      --add "checkout_session:metadata[product]=hair-color-pack" \
      --add "checkout_session:customer_details[email]=$EMAIL"
    echo ""
    echo "Check your dev server logs for [stripe webhook] grant + email send."
    echo "Then verify in DB:"
    echo "  SELECT email, balance, totalEarned FROM \"PaidCredits\" WHERE email='$EMAIL';"
    ;;

  trigger-cancelled)
    echo "Triggering checkout.session.expired (no credit grant expected)"
    stripe trigger checkout.session.expired
    ;;

  *)
    cat <<EOF
Usage:
  $0 listen                       # Forward Stripe test events to local dev
  $0 trigger [email] [credits]    # Fire a fake checkout.session.completed
  $0 trigger-cancelled            # Fire a fake checkout.session.expired

Tip: run 'listen' in one terminal, 'trigger' in another.
EOF
    ;;
esac
