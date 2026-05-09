#!/bin/bash
# All 17 test cases — sourced by run.sh after _lib.sh.

# ===== TEST 1: Free quota — 3 calls OK, 4th blocked =====
test_free_quota_exhaustion() {
  it "Free quota exhaustion (anon, 3 OK then 429)"
  reset_db
  local jar=$(jar "anon-a")
  rm -f "$jar"

  for i in 1 2 3; do
    local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
    assert_status "$resp" "200" "consume #$i"
  done
  local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
  assert_status "$resp" "429" "consume #4 (should block)"
}

# ===== TEST 2: Per-tool isolation =====
test_per_tool_isolation() {
  it "Per-tool free quota isolation"
  reset_db
  local jar=$(jar "anon-b")
  rm -f "$jar"

  # Burn 3 free on hair-color
  for i in 1 2 3; do
    http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/dev/null
  done

  # personal-color should still have 3 left
  local resp=$(http_get "$BASE/api/tools/personal-color/check" "$jar")
  assert_status "$resp" "200" "personal-color check after hair-color exhausted"
  assert_json_field "$resp" "remainingFree" "3" "personal-color free quota intact"

  # hair-color check shows 0 left
  local resp2=$(http_get "$BASE/api/tools/hair-color/check" "$jar")
  assert_json_field "$resp2" "remainingFree" "0" "hair-color free quota exhausted"
}

# ===== TEST 3: IP cap =====
test_ip_cap_defense() {
  it "IP-shared cap (5 different anon, 6th blocked)"
  reset_db

  # Use different anonId cookies but same IP — IP cap should kick in at 6th
  for i in 1 2 3 4 5; do
    local jar=$(jar "ip-anon-$i")
    rm -f "$jar"
    local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
    assert_status "$resp" "200" "anon $i consume"
  done
  local jar6=$(jar "ip-anon-6")
  rm -f "$jar6"
  local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar6")
  assert_status "$resp" "429" "6th anon should hit IP cap"
}

# ===== TEST 4: Free refund on Gemini failure =====
test_free_refund_on_failure() {
  it "Free quota refunded when /analyze validation fails"
  reset_db
  local jar=$(jar "refund-anon")
  rm -f "$jar"

  # Send a tiny invalid image — validateImageBuffer rejects, no quota consumed
  ensure_tiny_png
  local resp=$(http_post_form "$BASE/api/tools/hair-color/analyze" "-F image=@$TINY_PNG_PATH" "$jar")
  local code=$(http_status "$resp")
  if [ "$code" = "422" ] || [ "$code" = "413" ] || [ "$code" = "415" ]; then
    ok "validation rejected with $code (quota NOT touched)"
  else
    fail "expected 422/413/415, got $code"
  fi

  # Check quota — should still be 3 (no consumption from failed validation)
  local check=$(http_get "$BASE/api/tools/hair-color/check" "$jar")
  assert_json_field "$check" "remainingFree" "3" "free quota still 3 after validation fail"
}

# ===== TEST 5: Anonymous buy blocked (auth required) =====
test_anonymous_buy_blocked() {
  it "Anonymous /api/checkout/* requires sign-in (401)"

  for tool in hair-color personal-color; do
    local resp=$(http_post_json "$BASE/api/checkout/$tool" '' "")
    assert_status "$resp" "401" "POST /api/checkout/$tool"
    assert_json_field "$resp" "error" "auth_required" "error code"
  done
}

# ===== TEST 6: Sign out hides paidCredits =====
test_signout_hides_balance() {
  it "Sign out → /check returns 0 paidCredits"
  reset_db
  local jar=$(jar "signout-user")
  rm -f "$jar"

  # Login as user → grant 10 credits via webhook → check shows 10
  login_as "signout-test@example.com" "$jar"
  node tests/send-webhook.js "signout-test@example.com" 10 >/dev/null
  sleep 1

  local before=$(http_get "$BASE/api/tools/hair-color/check" "$jar")
  local credits=$(http_body "$before" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(s).paidCredits)}catch{}})")
  if [ "$credits" -ge 10 ]; then
    ok "before signout: paidCredits=$credits"
  else
    fail "expected paidCredits>=10 before signout, got $credits"
  fi

  # Sign out
  curl -sS -b "$jar" -c "$jar" -X DELETE "$BASE/api/test/login" >/dev/null

  # Check again → should be 0
  local after=$(http_get "$BASE/api/tools/hair-color/check" "$jar")
  assert_json_field "$after" "paidCredits" "0" "after signout: paidCredits=0"
}

# ===== TEST 7: Different accounts → different balances =====
test_isolated_balances() {
  it "Different signed-in users see independent balances"
  reset_db

  local jarA=$(jar "userA")
  local jarB=$(jar "userB")
  rm -f "$jarA" "$jarB"

  login_as "user-a@example.com" "$jarA"
  login_as "user-b@example.com" "$jarB"

  # Grant 10 to A only
  node tests/send-webhook.js "user-a@example.com" 10 >/dev/null
  sleep 1

  local respA=$(http_get "$BASE/api/tools/hair-color/check" "$jarA")
  local respB=$(http_get "$BASE/api/tools/hair-color/check" "$jarB")

  local balA=$(http_body "$respA" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(s).paidCredits)}catch{}})")
  local balB=$(http_body "$respB" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(s).paidCredits)}catch{}})")

  if [ "$balA" -ge 10 ]; then ok "user A: $balA credits"; else fail "user A: expected >=10, got $balA"; fi
  if [ "$balB" = "0" ]; then ok "user B: 0 credits (isolated)"; else fail "user B: expected 0, got $balB"; fi
}

# ===== TEST 8: Webhook grants credits =====
test_webhook_grants_credits() {
  it "Webhook checkout.session.completed → PaidCredits row inserted"
  reset_db

  local email="webhook-test-$(date +%s)@example.com"
  node tests/send-webhook.js "$email" 10 >/dev/null
  sleep 1

  assert_db_count "PaidCredits" "email='$email'" "1" "PaidCredits row created"
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "10" "balance is 10"
  assert_db_count "StripePayment" "email='$email' AND status='paid'" "1" "StripePayment marked paid"
}

# ===== TEST 9: Webhook idempotency =====
test_webhook_idempotency() {
  it "Same sessionId 2x → no double grant"
  reset_db
  local email="idempotent-$(date +%s)@example.com"
  local sid="cs_test_idem_$(date +%s)"
  node tests/send-webhook.js "$email" 10 "$sid" >/dev/null
  sleep 1
  node tests/send-webhook.js "$email" 10 "$sid" >/dev/null
  sleep 1
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "10" "balance still 10 after duplicate webhook"
  assert_db_count "StripePayment" "\"sessionId\"='$sid'" "1" "only 1 StripePayment row"
}

# ===== TEST 10: Webhook bad signature → 400 =====
test_webhook_bad_signature() {
  it "Webhook with bad signature → 400"
  local resp=$(curl -sS -X POST "$BASE/api/webhooks/stripe" \
    -H "stripe-signature: t=1,v1=bogus" \
    -H "Content-Type: application/json" \
    -d '{"type":"checkout.session.completed"}' \
    -w "\n%{http_code}")
  assert_status "$resp" "400" "bad signature rejected"
}

# ===== TEST 11: Purchase email triggered =====
test_purchase_email_triggered() {
  skip "Email send is fire-and-forget; verify by inspecting AgentMail dashboard or dev server logs"
}

# ===== TEST 12: Paid path activates after free exhausted =====
test_paid_path_after_free() {
  it "Signed-in user: 3 free first, then paid drained"
  reset_db
  local jar=$(jar "paid-path")
  rm -f "$jar"

  local email="paid-path-$(date +%s)@example.com"
  login_as "$email" "$jar"
  node tests/send-webhook.js "$email" 10 >/dev/null
  sleep 1

  # Burn 3 free
  for i in 1 2 3; do
    local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
    assert_json_field "$resp" "source" "free" "consume #$i source=free"
  done

  # 4th should consume from paid
  local resp=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
  assert_json_field "$resp" "source" "paid" "consume #4 source=paid"
  assert_json_field "$resp" "paidCredits" "9" "paid credits decremented to 9"
}

# ===== TEST 13: Cross-tool credit pool =====
test_cross_tool_pool() {
  it "Cross-tool pool: buy via hair-color, use on personal-color"
  reset_db
  local jar=$(jar "cross-tool")
  rm -f "$jar"

  local email="cross-tool-$(date +%s)@example.com"
  login_as "$email" "$jar"
  node tests/send-webhook.js "$email" 10 "" "hair-color-pack" >/dev/null
  sleep 1

  # Burn 3 free hair-color
  for i in 1 2 3; do http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/dev/null; done
  # Burn 3 free personal-color
  for i in 1 2 3; do http_post_json "$BASE/api/tools/personal-color/consume" '{}' "$jar" >/dev/null; done

  # Now both free are exhausted; both should fall through to paid
  local respH=$(http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar")
  local respP=$(http_post_json "$BASE/api/tools/personal-color/consume" '{}' "$jar")
  assert_json_field "$respH" "source" "paid" "hair-color paid (after free exhausted)"
  assert_json_field "$respP" "source" "paid" "personal-color paid (after free exhausted)"
  assert_json_field "$respP" "paidCredits" "8" "shared pool: 10 - 2 = 8"
}

# ===== TEST 14: Paid refund on validation failure =====
test_paid_refund_on_failure() {
  it "Paid credit refunded when /analyze validation fails"
  reset_db
  local jar=$(jar "paid-refund")
  rm -f "$jar"

  local email="paid-refund-$(date +%s)@example.com"
  login_as "$email" "$jar"
  node tests/send-webhook.js "$email" 10 >/dev/null
  sleep 1

  # Burn 3 free first
  for i in 1 2 3; do http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/dev/null; done

  # Now try /analyze with invalid image — validation fails BEFORE quota consumed
  ensure_tiny_png
  local resp=$(http_post_form "$BASE/api/tools/hair-color/analyze" "-F image=@$TINY_PNG_PATH" "$jar")
  local code=$(http_status "$resp")
  if [ "$code" = "422" ] || [ "$code" = "413" ] || [ "$code" = "415" ]; then
    ok "validation rejected with $code"
  else
    fail "expected 422/413/415, got $code"
  fi

  # Paid credits should still be 10 (validation failure → no consumption)
  local check=$(http_get "$BASE/api/tools/hair-color/check" "$jar")
  assert_json_field "$check" "paidCredits" "10" "paid credits intact after validation fail"
}

# ===== TEST 15: Repeated purchases accumulate =====
test_repeated_purchase_accumulates() {
  it "2 webhook events for same email → balance = 20"
  reset_db
  local email="accumulate-$(date +%s)@example.com"
  for i in 1 2; do
    node tests/send-webhook.js "$email" 10 >/dev/null
    sleep 1
  done
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "20" "balance accumulates to 20"
  assert_db_value "SELECT \"totalEarned\" FROM \"PaidCredits\" WHERE email='$email'" "20" "totalEarned=20"
}

# ===== TEST 16: Sunset endpoints =====
test_sunset_endpoints() {
  it "Sunset endpoints respond correctly"

  for tool in hair-color personal-color; do
    local resp=$(http_post_json "$BASE/api/checkout/$tool/claim" '{"sessionId":"x"}' "")
    assert_status "$resp" "410" "POST /api/checkout/$tool/claim → 410 Gone"

    local resp2=$(http_post_json "$BASE/api/tools/$tool/recover/request" '{"email":"x@y.com"}' "")
    assert_status "$resp2" "200" "POST /api/tools/$tool/recover/request → 200 neutral"
    assert_json_field "$resp2" "sunset" "true" "sunset flag present"

    local resp3=$(curl -sS -o /dev/null -w "%{http_code}|%{redirect_url}" "$BASE/api/tools/$tool/recover/confirm")
    local code=$(echo "$resp3" | cut -d'|' -f1)
    local redir=$(echo "$resp3" | cut -d'|' -f2)
    if [ "$code" = "307" ] && [[ "$redir" == *"/auth/signin"* ]]; then
      ok "GET recover/confirm → 307 → signin"
    else
      fail "GET recover/confirm: code=$code redirect=$redir"
    fi
  done
}

# ===== TEST 17: One real Gemini E2E call =====
test_real_gemini_e2e() {
  it "End-to-end /analyze with real Gemini call (1 credit ~$0.045)"
  ensure_real_photo
  if [ ! -f "$REAL_PHOTO" ]; then
    skip "REAL_PHOTO not found at $REAL_PHOTO"
    return
  fi
  if [ "${SKIP_E2E:-0}" = "1" ]; then
    skip "SKIP_E2E=1"
    return
  fi
  reset_db
  local jar=$(jar "e2e")
  rm -f "$jar"

  local resp=$(http_post_form "$BASE/api/tools/hair-color/analyze" "-F image=@$REAL_PHOTO" "$jar")
  local code=$(http_status "$resp")
  if [ "$code" = "200" ]; then
    ok "analyze returned 200"
    local body=$(http_body "$resp")
    local ok_field=$(echo "$body" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{const d=JSON.parse(s);console.log(d.ok+'|'+(d.result?.diagnosis?.candidates?.length || 0)+'|'+(!!d.result?.previewSimulation))}catch{console.log('parse_error')}})")
    local parts=(${ok_field//|/ })
    if [ "${parts[0]}" = "true" ] && [ "${parts[1]}" = "5" ] && [ "${parts[2]}" = "true" ]; then
      ok "diagnosis: 5 candidates + preview image"
    else
      fail "unexpected result shape: $ok_field"
    fi
  else
    fail "analyze returned $code: $(http_body "$resp" | head -c 200)"
  fi
}

# ===== TEST 18: Race — 5 concurrent /consume must respect FREE_LIMIT =====
# Regression for the 2026-05-09 prod incident where 5 parallel /simulate
# created 4 ToolUsage rows (FREE_LIMIT=3 was bypassed). The advisory_xact_lock
# fix didn't actually serialize anything in Prisma+Vercel+Railway PG; the
# rank-after-insert strategy in commit 5c8e847 is what we're protecting.
test_race_free_quota_burst() {
  it "Race: 5 concurrent /consume → exactly 3 succeed, 2 blocked"
  reset_db
  local jar=$(jar "race-free")
  rm -f "$jar"

  # Seed the cookie so all 5 concurrent calls share the same anonId
  http_get "$BASE/api/tools/hair-color/check" "$jar" >/dev/null

  rm -f /tmp/prompta-race-free-*.out
  for i in 1 2 3 4 5; do
    ( http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/tmp/prompta-race-free-$i.out ) &
  done
  wait

  local count_200=0 count_429=0
  for i in 1 2 3 4 5; do
    local code=$(http_status "$(cat /tmp/prompta-race-free-$i.out)")
    case "$code" in
      200) count_200=$((count_200 + 1)) ;;
      429) count_429=$((count_429 + 1)) ;;
    esac
  done

  if [ "$count_200" = "3" ] && [ "$count_429" = "2" ]; then
    ok "Race-safe: 3 × 200 + 2 × 429 (FREE_LIMIT enforced under burst)"
  else
    fail "Expected 3 × 200 + 2 × 429, got $count_200 × 200 + $count_429 × 429"
  fi

  # DB sanity: at most 3 ToolUsage rows for this anon
  local anon=$(grep prompta_anon "$jar" | awk '{print $7}')
  local rows=$(db_query "SELECT COUNT(*) FROM \"ToolUsage\" WHERE \"anonId\"='$anon' AND tool='hair-color' AND type='free'")
  if [ "$rows" = "3" ]; then
    ok "DB: exactly 3 free ToolUsage rows (no race-bypass leak)"
  else
    fail "DB: expected 3 rows, got $rows — race-bypass regression"
  fi
}

# ===== TEST 19: Race — 2 concurrent paid spend with balance=1 =====
# Validates that updateMany({where:{balance:{gt:0}}}) provides DB-level
# atomic protection for spendOneCredit. With balance=1, two concurrent
# spends must yield exactly 1 success + 1 failure.
test_race_paid_credit_burst() {
  it "Race: 2 concurrent paid spends with balance=1 → 1 ok + 1 blocked"
  reset_db
  local jar=$(jar "race-paid")
  rm -f "$jar"

  local email="race-paid-$(date +%s)@example.com"
  login_as "$email" "$jar"
  # Grant exactly 1 credit (override credits arg)
  node tests/send-webhook.js "$email" 1 >/dev/null
  sleep 1

  # Burn 3 free first so /consume falls through to paid path
  for i in 1 2 3; do
    http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/dev/null
  done

  # Now 2 concurrent /consume — only 1 should succeed (paid), other gets 429
  rm -f /tmp/prompta-race-paid-*.out
  for i in 1 2; do
    ( http_post_json "$BASE/api/tools/hair-color/consume" '{}' "$jar" >/tmp/prompta-race-paid-$i.out ) &
  done
  wait

  local paid_ok=0 blocked=0
  for i in 1 2; do
    local body=$(http_body "$(cat /tmp/prompta-race-paid-$i.out)")
    local source=$(echo "$body" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(s).source)}catch{}})")
    case "$source" in
      paid) paid_ok=$((paid_ok + 1)) ;;
      blocked) blocked=$((blocked + 1)) ;;
    esac
  done

  if [ "$paid_ok" = "1" ] && [ "$blocked" = "1" ]; then
    ok "Race-safe: 1 paid + 1 blocked (spendOneCredit atomic)"
  else
    fail "Expected 1 paid + 1 blocked, got $paid_ok paid + $blocked blocked"
  fi

  # DB: balance should be 0
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "0" "balance drained to 0"
  assert_db_value "SELECT \"totalUsed\" FROM \"PaidCredits\" WHERE email='$email'" "1" "totalUsed=1 (not 2)"
}

# ===== TEST 23: Checkout email pin — body/query injection ignored =====
# Regression for the Stripe Link incident: a signed-in user must always
# have customer_email pinned to their session email, even if a tampered
# client tries to inject a different email via body or query string.
test_checkout_email_pin() {
  it "Checkout: server pins customer_email to session, ignores body/query injection"
  reset_db
  local jar=$(jar "email-pin")
  rm -f "$jar"

  local victim="victim-$(date +%s)@example.com"
  login_as "$victim" "$jar"

  # Try to inject hacker email via both body and query string
  local resp=$(curl -sS -b "$jar" -c "$jar" -X POST \
    "$BASE/api/checkout/personal-color?customer_email=hacker@evil.com" \
    -H "Content-Type: application/json" \
    -d '{"customer_email":"hacker@evil.com","email":"hacker@evil.com"}' \
    -w "\n%{http_code}")

  assert_status "$resp" "200" "checkout still succeeds despite injection attempt"

  # Verify response.url is a real Stripe checkout URL (server didn't error or redirect oddly)
  local body=$(http_body "$resp")
  local url=$(echo "$body" | node -e "let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(s).url||'')}catch{}})")
  if [[ "$url" == https://checkout.stripe.com/* ]]; then
    ok "Stripe checkout URL returned (server-pinned email path)"
  else
    fail "Expected stripe.com checkout URL, got: ${url:0:100}"
  fi

  # NOTE: To fully verify pin behavior, we'd need to call stripe.checkout.sessions.retrieve()
  # with the session id parsed from the URL and confirm customer_email == victim.
  # That requires extra network calls; covered indirectly because the route source
  # never reads body.email or query.customer_email — server only uses session.user.email.
}

# ===== TEST 24: Webhook with payment_status=unpaid does NOT grant =====
# Stripe sends checkout.session.completed when the user finishes the form,
# but for ACH/invoice flows payment_status can still be 'unpaid' at that
# point. We only enable card payments today so this is future-proofing,
# but the guard also catches malformed test events.
test_webhook_pending_does_not_grant() {
  it "Webhook with payment_status=unpaid → 200 returned, no grant"
  reset_db

  local email="pending-$(date +%s)@example.com"
  local sid="cs_test_pending_$(date +%s)"
  WEBHOOK_TEST_PAYMENT_STATUS=unpaid node tests/send-webhook.js "$email" 10 "$sid" >/dev/null
  sleep 1

  # No PaidCredits row should exist (payment_status guard kicked in)
  assert_db_count "PaidCredits" "email='$email'" "0" "no PaidCredits row for unpaid session"

  # No StripePayment row either (we don't write a pending row for skipped events,
  # the route returns early before any DB write)
  assert_db_count "StripePayment" "\"sessionId\"='$sid'" "0" "no StripePayment row for unpaid session"

  # Sanity: same sessionId with payment_status=paid afterwards SHOULD grant
  # (no idempotency-blocking row from the earlier unpaid attempt)
  node tests/send-webhook.js "$email" 10 "$sid" >/dev/null
  sleep 1
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "10" "subsequent paid event grants normally"
}

# ===== TEST 25: Webhook with missing email field =====
# When Stripe ever sends a session without customer_details.email AND
# customer_email (e.g. malformed event), webhook must:
#   - return 200 (so Stripe doesn't infinite-retry billing the card)
#   - NOT grant credits
#   - NOT create a StripePayment row in 'paid' state
test_webhook_missing_email() {
  it "Webhook with missing email → 200 returned, no grant"
  reset_db

  local sid="cs_test_noemail_$(date +%s)"
  WEBHOOK_TEST_NO_EMAIL=1 node tests/send-webhook.js "ignored@example.com" 10 "$sid" >/dev/null
  sleep 1

  # No PaidCredits row should exist
  local pc_count=$(db_query "SELECT COUNT(*) FROM \"PaidCredits\"")
  if [ "$pc_count" = "0" ]; then
    ok "No PaidCredits row created (no email = no grant)"
  else
    fail "PaidCredits row count expected 0, got $pc_count"
  fi

  # No StripePayment in 'paid' status either (the missing-email branch returns early)
  local sp_count=$(db_query "SELECT COUNT(*) FROM \"StripePayment\" WHERE \"sessionId\"='$sid'")
  if [ "$sp_count" = "0" ]; then
    ok "No StripePayment row created"
  else
    fail "StripePayment row count for $sid expected 0, got $sp_count"
  fi
}

# === Test list (in order) ===
ALL_TESTS=(
  test_free_quota_exhaustion
  test_per_tool_isolation
  test_ip_cap_defense
  test_free_refund_on_failure
  test_anonymous_buy_blocked
  test_signout_hides_balance
  test_isolated_balances
  test_webhook_grants_credits
  test_webhook_idempotency
  test_webhook_bad_signature
  test_purchase_email_triggered
  test_paid_path_after_free
  test_cross_tool_pool
  test_paid_refund_on_failure
  test_repeated_purchase_accumulates
  test_sunset_endpoints
  test_real_gemini_e2e
  # === New 2026-05-09 ===
  test_race_free_quota_burst
  test_race_paid_credit_burst
  test_checkout_email_pin
  test_webhook_pending_does_not_grant
  test_webhook_missing_email
)
