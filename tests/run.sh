#!/bin/bash
# End-to-end test orchestrator for prompta freemium / payment flow.
#
# Spins up:
#   - local Postgres on :5433 (idempotent — re-uses if running)
#   - next dev with staging env (DATABASE_URL → local pg, ENABLE_TEST_AUTH=true)
#   - stripe CLI listen forwarding to localhost
# Runs all 17 test cases in tests/cases.sh against it.
# Tears everything down on exit (regardless of pass/fail).
#
# Prereqs:
#   - .env.local has: NEXTAUTH_SECRET, GOOGLE_AI_API_KEY (for E2E test #17),
#     STRIPE_SECRET_KEY=sk_test_xxx
#   - stripe CLI logged into a TEST sandbox (`stripe login`)
#   - postgresql@16 installed via brew
#
# Usage:
#   ./tests/run.sh                  # full suite
#   SKIP_E2E=1 ./tests/run.sh       # skip the 1 Gemini-paid test
#   FILTER=cross_tool ./tests/run.sh # run only tests matching name

set -uo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

# Source .env (base prod config) then .env.local (test mode overrides)
# so NEXTAUTH_SECRET / GOOGLE_AI_API_KEY / DATABASE_URL come from .env and
# STRIPE_SECRET_KEY=sk_test_* / STRIPE_PRICE_ID=price_test_* override.
set -a
[ -f .env ] && source .env
[ -f .env.local ] && source .env.local
set +a

# Hard guard: refuse to run against live Stripe key — would charge real money
if [[ "${STRIPE_SECRET_KEY:-}" == sk_live_* ]]; then
  echo "REFUSE: STRIPE_SECRET_KEY is sk_live_* — put sk_test_* in .env.local to override"
  exit 1
fi
if [ -z "${STRIPE_SECRET_KEY:-}" ]; then
  echo "Missing STRIPE_SECRET_KEY (need sk_test_*)"
  exit 1
fi
if [[ ! "${STRIPE_PRICE_ID:-}" =~ ^price_ ]]; then
  echo "Missing or invalid STRIPE_PRICE_ID"
  exit 1
fi

# Source helpers + cases
source tests/_lib.sh
source tests/cases.sh

PG_BIN=/opt/homebrew/opt/postgresql@16/bin
DEV_LOG=/tmp/prompta-test-dev.log
LISTEN_LOG=/tmp/prompta-test-stripe-listen.log
DEV_PID=
LISTEN_PID=

cleanup() {
  echo
  echo -e "${GRAY}Tearing down…${NC}"
  [ -n "$DEV_PID" ] && kill "$DEV_PID" 2>/dev/null || true
  [ -n "$LISTEN_PID" ] && kill "$LISTEN_PID" 2>/dev/null || true
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "stripe listen" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# === 1. Start local pg if not running ===
echo -e "${BLUE}=== 1/4 ensuring local Postgres is up on :5433 ===${NC}"
if ! LC_ALL=C "$PG_BIN/pg_isready" -h 127.0.0.1 -p 5433 >/dev/null 2>&1; then
  if [ -d .local-pg/data ]; then
    LC_ALL=C "$PG_BIN/pg_ctl" -D .local-pg/data -l .local-pg/server.log -o "-p 5433" start
    sleep 1
  else
    echo -e "${RED}.local-pg/data missing — run scripts/local-pg.sh start first${NC}"
    exit 1
  fi
fi
LC_ALL=C "$PG_BIN/pg_isready" -h 127.0.0.1 -p 5433
STAGING_URL="postgresql://postgres@127.0.0.1:5433/prompta_staging"
echo "  $STAGING_URL"

# === 2. Get fresh stripe webhook secret ===
echo
echo -e "${BLUE}=== 2/4 fetching stripe webhook signing secret ===${NC}"
WHSEC=$(stripe listen --print-secret 2>&1 | grep -oE "whsec_[A-Za-z0-9]+" | head -1)
if [ -z "$WHSEC" ]; then
  echo -e "${RED}Failed to get stripe webhook secret. Have you run 'stripe login'?${NC}"
  exit 1
fi
echo "  webhook secret: ${WHSEC:0:14}…"
# Export so test cases (which spawn node) can sign payloads with the same secret
export STRIPE_WEBHOOK_SECRET="$WHSEC"

# === 3. Start dev + stripe listen ===
echo
echo -e "${BLUE}=== 3/4 starting next dev (staging DB) + stripe listen ===${NC}"
if curl -sS -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -qE "200|404"; then
  echo "  port 3000 already in use — please stop existing dev server first"
  exit 1
fi

stripe listen --forward-to localhost:3000/api/webhooks/stripe > "$LISTEN_LOG" 2>&1 &
LISTEN_PID=$!

DATABASE_URL="$STAGING_URL" \
STRIPE_WEBHOOK_SECRET="$WHSEC" \
ENABLE_TEST_AUTH=true \
PORT=3000 \
npx next dev > "$DEV_LOG" 2>&1 &
DEV_PID=$!

echo "  waiting for next dev…"
for i in $(seq 1 60); do
  if grep -qE "Ready in" "$DEV_LOG" 2>/dev/null; then
    echo "  next dev ready"
    break
  fi
  sleep 1
done

if ! grep -qE "Ready in" "$DEV_LOG" 2>/dev/null; then
  echo -e "${RED}next dev did not become ready. Last 30 log lines:${NC}"
  tail -30 "$DEV_LOG"
  exit 1
fi

# Verify test endpoint
sleep 2
test_endpoint=$(curl -sS -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/test/login -H "Content-Type: application/json" -d '{"email":"smoke@x.com"}')
if [ "$test_endpoint" != "200" ]; then
  echo -e "${RED}/api/test/login returned $test_endpoint — ENABLE_TEST_AUTH not picked up?${NC}"
  tail -20 "$DEV_LOG"
  exit 1
fi
echo "  /api/test/login responsive"

# === 4. Run tests ===
echo
echo -e "${BLUE}=== 4/4 running ${#ALL_TESTS[@]} test cases ===${NC}"
for t in "${ALL_TESTS[@]}"; do
  if [ -n "${FILTER:-}" ] && [[ ! "$t" == *"$FILTER"* ]]; then
    continue
  fi
  $t
done

print_summary
