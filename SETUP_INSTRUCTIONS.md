# Prompta Setup Instructions for Vercel Deployment

## Current Status
✅ Build is successful on Vercel
⚠️ Application needs database configuration

## The Issue
You're seeing "Application error: a client-side exception has occurred" because the database is not yet configured. The API endpoints need a PostgreSQL database to return data.

## Step-by-Step Setup

### Step 1: Create/Obtain a PostgreSQL Database

Choose one of the following options:

#### Option A: Railway (Recommended for Vercel)
1. Go to [railway.app](https://railway.app)
2. Create a new account or log in
3. Click "Start a New Project"
4. Select "Add Database" → "PostgreSQL"
5. Copy the PostgreSQL connection string (it will look like: `postgresql://user:password@host:5432/railway`)

#### Option B: Neon (Free tier available)
1. Go to [neon.tech](https://neon.tech)
2. Create an account
3. Create a new project
4. Copy the connection string from the "Connection string" tab

#### Option C: Other PostgreSQL Providers
Use any PostgreSQL database provider's connection string

### Step 2: Add DATABASE_URL to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard/prompta
2. Click on "Settings" → "Environment Variables"
3. Add a new environment variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your PostgreSQL connection string (paste the URL from Step 1)
4. Click "Save"

### Step 3: Run Database Migrations

You need to set up the database schema. Do this locally:

```bash
# Set your production database URL locally
export DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Run migrations
npx prisma migrate deploy

# Optionally seed with initial data
npx prisma db seed
```

### Step 4: Re-deploy on Vercel

1. Go to your Vercel project dashboard
2. Click "Deployments"
3. Find your latest deployment
4. Click the menu (three dots) → "Redeploy"
5. Or push a new commit to GitHub to trigger automatic deployment

### Step 5: Verify It Works

1. Visit your deployment URL: https://prompta-jfpq4405s-martinfly1016s-projects.vercel.app/
2. The homepage should load with categories and prompts displayed
3. Go to `/admin/login` to access the admin panel
4. Default credentials:
   - Email: `admin@example.com`
   - Password: `changeme`

## Environment Variables Needed

In Vercel, configure these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | PostgreSQL connection string | **Required** - your database URL |
| `NEXTAUTH_URL` | `https://your-vercel-domain.app` | Your deployment URL |
| `NEXTAUTH_SECRET` | (generate with `openssl rand -base64 32`) | **Required** - keep secret |

## Troubleshooting

### Still getting "Application error"?
1. Check Vercel logs: Go to Deployments → Select your deployment → View Function Logs
2. Make sure DATABASE_URL is set correctly
3. Make sure database migrations ran successfully

### Getting 500 errors on API endpoints?
1. Check that DATABASE_URL is correct
2. Verify database connection from Vercel (check network connectivity)
3. Ensure migrations were run

### Admin login not working?
1. Make sure you have an admin user in the database
2. Database should have been seeded with `admin@example.com` user if you ran `npx prisma db seed`
3. Check NEXTAUTH_URL matches your deployment domain

## Database Schema

The app uses Prisma with these models:
- `User` - Admin users
- `Category` - Prompt categories
- `Prompt` - AI prompts (with draft/published states)

Migrations handle automatic schema creation.

## Next Steps

After successful setup:
1. Log into admin panel at `/admin/login`
2. Create categories at `/admin/categories`
3. Create prompts at `/admin/prompts`
4. Mark prompts as "published" to show them on the homepage
5. Configure custom domain (optional) in Vercel settings

## Support

If you encounter issues:
1. Check Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure database is accessible from Vercel's servers
4. Check that PostgreSQL credentials are correct

