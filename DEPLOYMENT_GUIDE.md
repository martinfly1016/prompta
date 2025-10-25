# Prompta Deployment Guide

This guide covers deploying the Prompta project to Vercel with PostgreSQL.

## Prerequisites

- GitHub account with the Prompta repository
- Vercel account (free tier available)
- PostgreSQL database (can use Railway, Neon, or other providers)

## Step 1: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select the `martinfly1016/prompta` repository
5. Click "Import"

## Step 2: Configure Environment Variables in Vercel

In the Vercel project settings, add the following environment variables:

### Required Variables

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-a-random-secret>
DATABASE_URL=postgresql://user:password@host:port/dbname
```

### Generating NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```

Copy the output and paste it as the `NEXTAUTH_SECRET` value.

### Setting DATABASE_URL

#### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the PostgreSQL connection string
4. Format: `postgresql://user:password@host.railway.app:5432/railway`

#### Option B: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create new project and PostgreSQL database
3. Copy the connection string from the "Connection string" tab

#### Option C: Managed Database
Use any PostgreSQL provider's connection string

## Step 3: Deploy the Project

1. After adding environment variables in Vercel, click "Deploy"
2. Wait for the build to complete
3. Vercel will provide a deployment URL

## Step 4: Initialize Database

### Using Prisma Migrations

After deployment, you need to run database migrations on the production database:

```bash
# From your local machine
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

Or if you prefer to use Vercel's terminal:

1. Go to your Vercel project → Deployments → Select latest → View Function Logs
2. Run the migration command in a new terminal connected to the deployment

### Seed Initial Data

If needed, seed the database with initial categories and admin user:

```bash
DATABASE_URL="your-production-database-url" npx prisma db seed
```

## Step 5: Create Admin Account

1. Visit your deployment URL
2. Go to `/admin/login`
3. Use the credentials from `.env` file (or set them in environment variables)
4. Default admin email: `admin@example.com`
5. Default password: `changeme` (change this in production!)

## Step 6: Update Admin Credentials (Optional but Recommended)

For security, update the admin password in the database:

```sql
-- Update admin user password (use bcrypt hash)
UPDATE "User" SET "passwordHash" = '<new-bcrypt-hash>'
WHERE email = 'admin@example.com';
```

Or create a new admin user via the application after logging in.

## Step 7: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update `NEXTAUTH_URL` to use your custom domain

## Troubleshooting

### Build Fails with Database Error
- Ensure `DATABASE_URL` is correctly set in Vercel environment variables
- The build doesn't require database access (sitemap has fallback)
- If issues persist, check database connection string format

### Session/Authentication Issues
- Verify `NEXTAUTH_SECRET` is set correctly
- Ensure `NEXTAUTH_URL` matches your deployment domain
- Clear browser cookies and try again

### Database Migration Issues
- Run migrations manually using the command above
- Check Prisma schema in `prisma/schema.prisma`
- Ensure PostgreSQL user has proper permissions

### 500 Errors
- Check Vercel function logs for error details
- Verify all environment variables are set
- Check database connection and schema

## Monitoring

### View Logs
1. Go to Vercel project → Deployments
2. Select a deployment
3. View Real-time Logs or Function Logs

### Monitor Database
Use your database provider's dashboard to:
- Check connection status
- Monitor query performance
- View storage usage

## Maintenance

### Regular Tasks
- Monitor logs for errors
- Keep dependencies updated
- Regularly backup database
- Review admin users and permissions

### Updating the Application
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Vercel auto-deploys on push
```

## Security Checklist

- [ ] Changed default admin password
- [ ] Updated NEXTAUTH_SECRET (use `openssl rand -base64 32`)
- [ ] Configured custom domain (optional)
- [ ] Set up database backups
- [ ] Reviewed security headers in `next.config.js`
- [ ] Enabled HTTPS (automatic with Vercel)
- [ ] Configured environment variables securely

## Useful Commands

```bash
# Run locally with production env
DATABASE_URL="your-url" npm run dev

# Check Prisma schema
npx prisma studio

# View database
npx prisma studio

# Reset database (WARNING: destructive)
npx prisma db push --skip-generate

# Generate Prisma client
npx prisma generate
```

## Support

For issues with:
- **Vercel**: Check [vercel.com/docs](https://vercel.com/docs)
- **Prisma**: Check [prisma.io/docs](https://prisma.io/docs)
- **NextAuth.js**: Check [next-auth.js.org](https://next-auth.js.org)
- **PostgreSQL**: Check your database provider's docs

