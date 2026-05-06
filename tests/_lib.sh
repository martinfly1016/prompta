#!/bin/bash
# Helpers shared by all test cases. Sourced by run.sh — not standalone.

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
GRAY='\033[0;90m'
NC='\033[0m'

PASS=0
FAIL=0
SKIPPED=0
FAILED_TESTS=()

BASE="${BASE_URL:-http://localhost:3000}"
PSQL=/opt/homebrew/opt/postgresql@16/bin/psql
DB_URL="${STAGING_DATABASE_URL:-postgresql://postgres@127.0.0.1:5433/prompta_staging}"

# === Test runner primitives ===

it() {
  local name="$1"
  echo
  printf "${BLUE}▶ TEST: %s${NC}\n" "$name"
  CURRENT_TEST="$name"
}

ok() {
  PASS=$((PASS + 1))
  printf "  ${GREEN}✓${NC} %s\n" "$1"
}

fail() {
  FAIL=$((FAIL + 1))
  FAILED_TESTS+=("$CURRENT_TEST: $1")
  printf "  ${RED}✗${NC} %s\n" "$1"
}

skip() {
  SKIPPED=$((SKIPPED + 1))
  printf "  ${YELLOW}∼${NC} SKIPPED: %s\n" "$1"
}

# === HTTP helpers (curl-based, follows cookies via per-test jar) ===

# Returns a fresh cookie jar path scoped to this test. Strips spaces AND
# slashes/special chars from the test title so the path stays in /tmp.
jar() {
  local name="${1:-default}"
  local safe=$(echo "$CURRENT_TEST" | tr -c 'A-Za-z0-9' '_')
  echo "/tmp/prompta-test-${safe}-${name}.cookies"
}

# GET with optional cookie jar
http_get() {
  local url="$1"
  local cookies="${2:-}"
  if [ -n "$cookies" ]; then
    curl -sS -b "$cookies" -c "$cookies" -w "\n%{http_code}" "$url"
  else
    curl -sS -w "\n%{http_code}" "$url"
  fi
}

# POST JSON
http_post_json() {
  local url="$1"
  local body="$2"
  local cookies="${3:-}"
  if [ -n "$cookies" ]; then
    curl -sS -b "$cookies" -c "$cookies" -X POST -H "Content-Type: application/json" -d "$body" -w "\n%{http_code}" "$url"
  else
    curl -sS -X POST -H "Content-Type: application/json" -d "$body" -w "\n%{http_code}" "$url"
  fi
}

# POST form (for /analyze, /simulate)
http_post_form() {
  local url="$1"
  local field="$2"
  local cookies="${3:-}"
  if [ -n "$cookies" ]; then
    curl -sS -b "$cookies" -c "$cookies" -X POST $field -w "\n%{http_code}" "$url"
  else
    curl -sS -X POST $field -w "\n%{http_code}" "$url"
  fi
}

# === Status code assertions ===

# Last line of curl response is the status code; everything else is body
http_status() { tail -n1 <<< "$1"; }
http_body()   { sed '$d' <<< "$1"; }

assert_status() {
  local resp="$1" expected="$2" label="$3"
  local got=$(http_status "$resp")
  if [ "$got" = "$expected" ]; then
    ok "$label → HTTP $got"
  else
    fail "$label → expected HTTP $expected, got $got. Body: $(http_body "$resp" | head -c 200)"
  fi
}

assert_json_field() {
  local resp="$1" field="$2" expected="$3" label="$4"
  local body=$(http_body "$resp")
  local got=$(echo "$body" | node -e "
    let s = ''
    process.stdin.on('data', c => s += c)
    process.stdin.on('end', () => {
      try { const d = JSON.parse(s); console.log(d.$field ?? 'undefined') } catch { console.log('parse_error') }
    })
  ")
  if [ "$got" = "$expected" ]; then
    ok "$label → $field=$expected"
  else
    fail "$label → expected $field=$expected, got $got. Body head: ${body:0:200}"
  fi
}

# === DB query helpers ===

db_query() {
  $PSQL "$DB_URL" -tA -c "$1" 2>&1
}

assert_db_count() {
  local table="$1" where="$2" expected="$3" label="$4"
  local got=$(db_query "SELECT COUNT(*) FROM \"$table\" WHERE $where")
  if [ "$got" = "$expected" ]; then
    ok "$label → $table count=$expected"
  else
    fail "$label → expected $table count=$expected, got '$got' (where: $where)"
  fi
}

assert_db_value() {
  local sql="$1" expected="$2" label="$3"
  local got=$(db_query "$sql")
  if [ "$got" = "$expected" ]; then
    ok "$label → $expected"
  else
    fail "$label → expected '$expected', got '$got'"
  fi
}

# === Test infrastructure ===

reset_db() {
  curl -sS -X POST "$BASE/api/test/reset" >/dev/null
}

login_as() {
  local email="$1"
  local cookies="$2"
  local resp=$(curl -sS -c "$cookies" -X POST "$BASE/api/test/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$email\"}" -w "\n%{http_code}")
  local code=$(http_status "$resp")
  if [ "$code" != "200" ]; then
    echo "  ${RED}FATAL: login_as $email failed: $(http_body "$resp")${NC}"
    return 1
  fi
}

# Use a tiny known-good 1x1 PNG so we never need a fixture for ToolUsage tests
# (image is decoded by sharp + size-checked but content doesn't matter for /consume).
TINY_PNG_PATH=/tmp/prompta-test-tiny.png
ensure_tiny_png() {
  if [ ! -f "$TINY_PNG_PATH" ]; then
    # 1x1 transparent PNG - too small for /analyze (will get 422), but fine
    # for /consume which doesn't check image. We test /analyze with real photo.
    printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82' > "$TINY_PNG_PATH"
  fi
}

# Real portrait for the one E2E /analyze test. Copied to /tmp at run-time
# so curl's -F image=@<path> doesn't choke on the project's space-laden path.
REAL_PHOTO=/tmp/prompta-test-portrait.png
ensure_real_photo() {
  if [ ! -f "$REAL_PHOTO" ]; then
    local src="/Users/yuchao/Documents/vibe coding/prompta/seo/style-test-samples/output/_v2_expression-neutral-to-subtle-smile.png"
    [ -f "$src" ] && cp "$src" "$REAL_PHOTO"
  fi
}

# === Summary ===

print_summary() {
  echo
  echo "=================================================================="
  printf "  ${GREEN}PASS: %d${NC}  ${RED}FAIL: %d${NC}  ${YELLOW}SKIP: %d${NC}\n" "$PASS" "$FAIL" "$SKIPPED"
  echo "=================================================================="
  if [ "$FAIL" -gt 0 ]; then
    echo
    echo "Failures:"
    for t in "${FAILED_TESTS[@]}"; do
      printf "  ${RED}✗${NC} %s\n" "$t"
    done
    return 1
  fi
}
