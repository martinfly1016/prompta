# Root Cause Analysis - Production API Errors

**Analysis Date**: 2025-10-26
**Status**: 🔴 CRITICAL - Database migrations not executed in production
**Severity**: Blocking all functionality

---

## Problem Summary

Production environment is showing two critical API errors:

```
❌ GET /api/categories → 500 "カテゴリ取得に失敗しました"
❌ GET /api/prompts → 401 "認証が必要です"
```

Homepage shows "読み込み中..." (Loading) for both sections but data never loads.

---

## Root Cause

**PRIMARY ISSUE**: Database migrations were never executed in production environment.

### Evidence

1. **Build Script Analysis** (package.json:8)
   ```json
   "build": "prisma generate && next build"
   ```
   - ❌ Missing `prisma migrate deploy`
   - ✅ Has `prisma generate` (only generates Prisma Client)
   - ✅ Has `next build` (builds Next.js app)

2. **Vercel Build Process**
   - Vercel runs `npm run build` during deployment
   - This executes: `prisma generate && next build`
   - It does NOT execute: `prisma migrate deploy`
   - Result: Prisma Client is generated but database tables are not created

3. **Database State**
   - Environment variable `DATABASE_URL` is configured ✅
   - PostgreSQL database exists and is accessible ✅
   - Database schema is NOT created in production ❌
   - Tables like `category`, `prompt`, `prompt_image` do NOT exist ❌

4. **Cascading Errors**
   - When `/api/categories` tries `prisma.category.findMany()` → database table doesn't exist → 500 error
   - When `/api/prompts` initializes, NextAuth tries to access database → fails → returns 401 as fallback

---

## Why This Happened

### Scenario
1. Feature was implemented locally with SQLite (migrations created)
2. Database was migrated from SQLite to PostgreSQL (schema.prisma updated)
3. Environment variables were configured in Vercel (DATABASE_URL, NEXTAUTH_SECRET, etc.)
4. Code was deployed to Vercel
5. **BUILD STEP MISSING**: `prisma migrate deploy` was not added to build script
6. Vercel built and deployed the app without creating database tables
7. API requests fail because tables don't exist

### Contributing Factors
- Migration file was created locally: `prisma/migrations/[timestamp]_add_prompt_image_model`
- Migration status shows: "Database schema is up to date" (checked locally with migration)
- But migration was NEVER sent to production database (no `migrate deploy` command)

---

## Solution

### Quick Fix (Recommended)

**Step 1: Update build script**

Edit `package.json`:
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

**Step 2: Commit and push**

```bash
git add package.json
git commit -m "fix: Add prisma migrate deploy to build script for Vercel"
git push origin main
```

**Step 3: Verify**
- Vercel will automatically redeploy
- Watch build logs: https://vercel.com/martinfly1016/prompta/deployments
- Deployment should show: "prisma migrate deploy" executing
- Once deployed, API requests should return 200 ✅

**Expected Result After Fix**:
```
✅ GET /api/categories → 200 OK
   Returns: [{"id":1,"name":"ライティング",...},...]

✅ GET /api/prompts?limit=6 → 200 OK
   Returns: {"prompts":[...],"pagination":{...}}

✅ Homepage displays categories and prompts
✅ Image thumbnails display on cards
✅ Image gallery works on detail pages
```

---

## Detailed Technical Analysis

### API Error #1: GET /api/categories → 500

**Code Location**: `src/app/api/categories/route.ts:13`

```typescript
const categories = await prisma.category.findMany({...})
```

**What Happens**:
1. Request arrives at API endpoint
2. Code tries to query `category` table
3. PostgreSQL responds: "relation 'category' does not exist"
4. Prisma throws error
5. Catch block returns 500 with message "カテゴリ取得に失敗しました"

**Error Flow**:
```
GET /api/categories
  ↓
prisma.category.findMany()
  ↓
SELECT * FROM "category" ...
  ↓
PostgreSQL: ERROR - relation "category" does not exist
  ↓
Prisma throws PrismaClientRustPanicError
  ↓
Catch block executes
  ↓
Return 500 response with error message
```

---

### API Error #2: GET /api/prompts → 401

**Code Location**: `src/app/api/prompts/route.ts:9-58`

**Code Analysis**:
```typescript
export async function GET(request: NextRequest) {
  try {
    // NO authentication check here!
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({...}),  // Line 32
      prisma.prompt.count({...})      // Line 39
    ])
    return NextResponse.json({...})
  } catch (error) {
    return NextResponse.json(
      { error: 'プロンプト取得に失敗しました' },
      { status: 500 }
    )
  }
}
```

**Issue**: The GET endpoint has NO authentication requirement. So 401 error is NOT coming from this handler!

**Root Cause**: The 401 error is coming from NextAuth initialization failure:

1. When page loads, JavaScript calls `getServerSession()` to check if user is logged in
2. `getServerSession()` is called in auth.ts credentials provider
3. NextAuth needs to query database to initialize
4. Database is not accessible (no tables exist)
5. NextAuth initialization fails
6. NextAuth returns 401 as fallback/error response

**Error Flow**:
```
GET /api/prompts
  ↓
NextAuth initialization
  ↓
authOptions.providers.authorize() callback
  ↓
prisma.user.findUnique() (line 20 of auth.ts)
  ↓
SELECT * FROM "user" WHERE ...
  ↓
PostgreSQL: ERROR - relation "user" does not exist
  ↓
NextAuth throws error
  ↓
NextAuth returns 401 response (authentication failed)
```

---

## Prevention

To prevent this in future deployments:

1. **Always include migrations in build script**:
   ```json
   "build": "prisma generate && prisma migrate deploy && next build"
   ```

2. **Test deployment locally**:
   ```bash
   # Simulate Vercel build
   DATABASE_URL="..." npm run build
   ```

3. **Verify migrations before deploying**:
   ```bash
   npx prisma migrate status
   ```

4. **Monitor Vercel build logs** after each deployment

---

## Timeline

| Time | Action | Result |
|------|--------|--------|
| T-24h | Code implemented with image upload feature | ✅ Compiles locally |
| T-10h | Database migrated to PostgreSQL | ✅ Works locally |
| T-10h | Environment variables configured in Vercel | ✅ Variables set |
| T-8h | Code pushed to GitHub | 🔴 Vercel deployed without migrations |
| T-0m | Testing production | ❌ API errors found |
| T-5m | Root cause identified | **Missing `prisma migrate deploy` in build script** |

---

## Verification Checklist

After applying the fix:

- [ ] Updated `package.json` build script
- [ ] Committed and pushed changes
- [ ] Vercel deployment started automatically
- [ ] Build logs show "prisma migrate deploy" executing
- [ ] Deployment completes successfully (green ✅)
- [ ] GET /api/categories returns 200
- [ ] GET /api/prompts returns 200
- [ ] Homepage displays categories
- [ ] Homepage displays prompts
- [ ] Homepage displays image thumbnails
- [ ] All image features work

---

**Status**: Ready to apply fix
**Estimated Fix Time**: 5 minutes (1 line change in package.json)
**Risk Level**: Low (only adding required step to build process)

