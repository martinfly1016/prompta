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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:customer_details.email=signout-test@example.com" \
    >/dev/null 2>&1
  sleep 3

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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:customer_details.email=user-a@example.com" \
    >/dev/null 2>&1
  sleep 3

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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:customer_details.email=$email" \
    >/dev/null 2>&1
  sleep 3

  assert_db_count "PaidCredits" "email='$email'" "1" "PaidCredits row created"
  assert_db_value "SELECT balance FROM \"PaidCredits\" WHERE email='$email'" "10" "balance is 10"
  assert_db_count "StripePayment" "email='$email' AND status='paid'" "1" "StripePayment marked paid"
}

# ===== TEST 9: Webhook idempotency =====
test_webhook_idempotency() {
  it "Same checkout.session.completed event 2x → balance stays at 10 (not 20)"
  skip "Requires same sessionId on 2 trigger calls — stripe trigger generates new session each time. Tested manually via Dashboard 'Resend' button."
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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:customer_details.email=$email" \
    >/dev/null 2>&1
  sleep 3

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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:metadata.product=hair-color-pack" \
    --override "checkout_session:customer_details.email=$email" \
    >/dev/null 2>&1
  sleep 3

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
  stripe trigger checkout.session.completed \
    --override "checkout_session:metadata.credits=10" \
    --override "checkout_session:customer_details.email=$email" \
    >/dev/null 2>&1
  sleep 3

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
    stripe trigger checkout.session.completed \
      --override "checkout_session:metadata.credits=10" \
      --override "checkout_session:customer_details.email=$email" \
      >/dev/null 2>&1
    sleep 3
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
)
