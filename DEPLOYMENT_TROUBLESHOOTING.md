# Deployment Troubleshooting Guide

**Date**: 2025-10-26 15:40 UTC
**Issue**: Production API returning 500 and 401 errors despite environment variable configuration
**Status**: 🔍 Investigation in progress

---

## Timeline of Actions

### T+0m: Initial Issue Discovery
```
❌ GET /api/categories → 500 "カテゴリ取得に失敗しました"
❌ GET /api/prompts → 401 "認証が必要です"
```

### T+10m: Root Cause Analysis
- Identified that `package.json` build script was missing `prisma migrate deploy`
- Database tables exist locally (verified with direct Prisma Client test)
- 5 categories confirmed in production database ✅

### T+15m: Fix Applied
- Updated `package.json` build script:
  ```json
  "build": "prisma generate && prisma migrate deploy && next build"
  ```
- Committed: `24944f3`
- Pushed to `origin main`

### T+20m: Waiting for Deployment
- Deployment should be triggered automatically
- Typical Vercel deployment: 60-90 seconds

### T+25m: Verification Test
- Ran `DATABASE_URL="..." npx prisma migrate deploy`
- Result: "No pending migrations to apply" ✅
- Ran direct Prisma test:
  - ✅ 5 categories found
  - ✅ 0 prompts found
  - ✅ PromptImages table accessible
- **Database connection is working perfectly locally**

### T+30m: Production Test Still Failing
- Vercel still returning 500 error
- HTTP timestamp shows recent deployment (15:38:02)
- Response doesn't include new error message added in latest commit
- **Conclusion**: Old deployment still running or caching issue

### T+35m: Added Diagnostic Logging
- Enhanced `/api/categories` with detailed error logging
- Committed: `47c982c`
- Pushed for redeploy

---

## Key Findings

### ✅ What's Working
1. **Local Development**
   - Database connection to PostgreSQL works
   - All Prisma models accessible
   - Direct queries return data correctly
   - App runs without errors locally

2. **Database State**
   - PostgreSQL is running on Railway
   - DATABASE_URL is correct
   - Schema has all required tables
   - 5 default categories are seeded
   - Prisma migrations are applied

3. **Environment Variables**
   - DATABASE_URL: Configured in Vercel ✅
   - NEXTAUTH_SECRET: Configured in Vercel ✅
   - NEXTAUTH_URL: Configured in Vercel ✅

### ❌ What's Not Working
1. **Vercel Runtime**
   - Prisma Client can't connect in Vercel functions
   - Or environment variables aren't loading in functions
   - Or there's a build/function initialization issue

2. **Deployment**
   - Changes aren't being picked up immediately
   - Old code still being served
   - Build might be failing silently
   - Function might be cached/stale

---

## Possible Root Causes

### Hypothesis 1: Environment Variables Not Loading in Functions
**Probability**: 🔴 High

The environment variables are configured in Vercel Project Settings, but they might not be:
- Loaded into the function environment correctly
- Accessible to `process.env` in the function
- Configured at the right scope (Production vs Preview)

**Evidence**:
- Works locally with explicit DATABASE_URL
- Fails in production serverless functions
- NextAuth initialization depends on DATABASE_URL

**Next Step**:
- Add logging to show `process.env.DATABASE_URL` value in function
- Check Vercel Function Logs

### Hypothesis 2: Vercel Build Process Issue
**Probability**: 🟡 Medium

The build script modification might not be working correctly:
- `prisma migrate deploy` might be failing silently
- Build might complete but function still old
- Vercel might have cached the previous build

**Evidence**:
- Diagnostic code not in response (old build still running)
- Deployment timestamp is recent but response unchanged
- Latest commits not reflected in output

**Next Step**:
- Check Vercel Build Logs
- Manually trigger redeploy from Vercel dashboard

### Hypothesis 3: Prisma Client Generation Issue
**Probability**: 🟡 Medium

The Prisma Client might not be regenerated correctly for the new schema:
- PromptImage model might not be included in generated client
- Client might be missing some types
- Version mismatch between locally generated and production

**Evidence**:
- Locally we can query PromptImages
- Production might have old Prisma Client

**Next Step**:
- Check if `prisma generate` needs to happen before migrate
- Verify Prisma Client version in node_modules

---

## Immediate Troubleshooting Steps

### Step 1: Check Vercel Build Logs

```
https://vercel.com/martinfly1016/prompta/deployments
↓
Click on latest deployment
↓
Click "View Build Logs"
↓
Look for:
  - "prisma generate"
  - "prisma migrate deploy"
  - Any error messages
  - Build completion time
```

### Step 2: Check Vercel Function Logs

```
https://vercel.com/martinfly1016/prompta/logs?type=function
↓
Look for recent /api/categories calls
↓
Check for error messages with:
  - DATABASE_URL value
  - "No pending migrations"
  - Prisma error details
```

### Step 3: Verify Environment Variables in Vercel

```
https://vercel.com/martinfly1016/prompta/settings/environment-variables
↓
Confirm all three are set:
  ✅ DATABASE_URL = postgresql://...
  ✅ NEXTAUTH_SECRET = <value>
  ✅ NEXTAUTH_URL = https://prompta-...
↓
Check scope: Should be "Production"
```

### Step 4: Manual Redeploy from Vercel Dashboard

If logs show the build failed:
```
https://vercel.com/martinfly1016/prompta/deployments
↓
Find latest deployment
↓
Click three-dot menu (...)
↓
Select "Redeploy"
↓
Confirm "Redeploy"
↓
Wait 60-90 seconds
↓
Test API again
```

### Step 5: Force Rebuild by Updating Build Script

If manual redeploy doesn't work:

```bash
# Alternative approach: Use prisma db push instead of migrate deploy
# Edit package.json
"build": "prisma generate && prisma db push && next build"

# Commit and push
git add package.json
git commit -m "chore: Try prisma db push instead of migrate deploy"
git push origin main
```

**Why this might help**:
- `prisma db push` synchronizes local schema with database
- More forgiving than `migrate deploy` if migration files are inconsistent
- Might work better in CI/CD environment

---

## Alternative Solution: Pre-built Images or Manual Migration

If standard deployment isn't working, consider:

### Option A: Run Migration Before Deployment

From local terminal with production DATABASE_URL:

```bash
DATABASE_URL="postgresql://postgres:mjKbrVldxszwnbiVFRcBNNNzeGQjziqk@interchange.proxy.rlwy.net:15624/railway" \
  npx prisma migrate deploy
```

Then just deploy the code without the migration step.

### Option B: Use prisma db push in Build Script

```json
"build": "prisma generate && prisma db push --skip-generate && next build"
```

### Option C: Use Vercel's Deployment Hooks

Set up a deployment hook to run migrations after build completes.

---

## Testing Checklist

Once deployment is working, verify:

- [ ] Browser: GET `/api/categories` shows 200 status in Network tab
- [ ] Browser: GET `/api/prompts` shows 200 status in Network tab
- [ ] Browser: Homepage displays "カテゴリ" section with data
- [ ] Browser: Homepage displays "最新プロンプト" section (may be empty)
- [ ] curl: `curl https://prompta.../api/categories` returns array
- [ ] curl: `curl https://prompta.../api/prompts` returns object with pagination
- [ ] Dev Tools: No console errors
- [ ] Dev Tools: Network tab shows all requests with 200 status

---

## Performance Metrics

**Deployment Time Expected**:
- Git push to GitHub: < 1 second
- GitHub webhook to Vercel: < 2 seconds
- Vercel build start: < 5 seconds
- Build execution time: 60-90 seconds
- Function warmup: < 2 seconds
- **Total**: 60-120 seconds from push to live

**Current Situation**:
- Time since last push: ~35 minutes
- Deployment should be complete by now

---

## Next Actions

1. **IMMEDIATE**: Check Vercel build logs
2. **If build failed**: Fix build script and repush
3. **If build succeeded**: Check Vercel function logs for runtime errors
4. **If env vars missing**: Add them to Vercel and manual redeploy
5. **If all else fails**: Use `prisma db push` instead of `migrate deploy`

---

## Files Modified for This Issue

### Modified
- `package.json` - Added `prisma migrate deploy` to build script
- `src/app/api/categories/route.ts` - Added diagnostic logging

### To Review
- Check Vercel: Build logs, Function logs, Environment variables
- Check Prisma: Migration files, Schema
- Check Environment: DATABASE_URL accessibility

---

**Status**: Awaiting manual verification via Vercel logs
**Next Update**: After checking Vercel build/function logs
**Estimated Resolution**: 5-10 minutes with correct diagnosis

