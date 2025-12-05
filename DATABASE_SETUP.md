# Database & Email Notification Setup

This guide explains how to set up the database and email notifications for waitlist signups and platform tests.

## Overview

The system automatically:
- ✅ Saves waitlist signups to PostgreSQL database
- ✅ Sends you an email every time someone joins the waitlist
- ✅ Logs platform test activity
- ✅ Sends you an email every time someone tests the platform

## Prerequisites

1. **PostgreSQL Database** (choose one):
   - Local PostgreSQL installation
   - [Neon](https://neon.tech/) (free serverless PostgreSQL)
   - [Supabase](https://supabase.com/) (free PostgreSQL)
   - [Railway](https://railway.app/) (PostgreSQL hosting)

2. **Resend Account** (for email notifications):
   - Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
   - Get your API key from the dashboard

## Step 1: Install Dependencies

```bash
npm install prisma @prisma/client
npm install -D prisma
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database (example with Neon)
DATABASE_URL="postgresql://user:password@ep-cool-cloud-123456.us-east-2.aws.neon.tech/gami_protocol?sslmode=require"

# Email Service
RESEND_API_KEY="re_your_resend_api_key_here"
EMAIL_FROM="onboarding@gamiprotocol.xyz"

# Your admin email (you'll receive notifications here)
ADMIN_EMAIL="your-email@example.com"
```

### Getting Database URL:

#### Option A: Neon (Recommended - Free)
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string (Prisma format)

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the "Connection string" (Prisma format)

#### Option C: Local PostgreSQL
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/gami_protocol"
```

## Step 3: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (creates tables)
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

## Step 4: Configure Resend Email

1. Go to [resend.com](https://resend.com)
2. Create account and verify your email
3. Add your domain OR use Resend's test domain
4. Go to API Keys and create a new key
5. Copy the key to your `.env.local` as `RESEND_API_KEY`

### Email Domain Setup:

**For Testing (Quick Start):**
- Use `onboarding@resend.dev` as your `EMAIL_FROM`
- Emails will work immediately (sent from Resend's domain)

**For Production:**
- Add your custom domain in Resend dashboard
- Verify DNS records
- Use `onboarding@yourdomain.com` as `EMAIL_FROM`

## Step 5: Test the System

### Test Waitlist Signup:

Visit your site and fill out the waitlist form. You should:
1. See success message on the form
2. Receive an email at your `ADMIN_EMAIL` with signup details
3. See the entry in database (run `npx prisma studio` to check)

### Test Platform Activity:

Send a POST request to log platform tests:

```bash
curl -X POST http://localhost:3000/api/platform-test \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "testType": "wallet-connection",
    "details": "Successfully connected MetaMask wallet"
  }'
```

You should receive an email notification with the test details.

## Database Schema

### Tables:

**waitlist_signups:**
- `id` - Unique identifier
- `email` - User email (unique)
- `business` - Business/DAO name
- `wallet` - Optional wallet address
- `status` - PENDING | CONTACTED | ONBOARDED | REJECTED
- `createdAt` - Signup timestamp
- `updatedAt` - Last update timestamp

**platform_tests:**
- `id` - Unique identifier
- `email` - User email
- `testType` - Type of test performed
- `details` - Optional test details
- `completedAt` - Test timestamp

## Managing Data

### View All Signups:
```bash
npx prisma studio
```
Then navigate to `waitlist_signups` table.

### Export Data to CSV:
```bash
# Install pg_dump or use Prisma Studio's export feature
npx prisma studio
# Click on table > Export > CSV
```

### Query Database:
```typescript
// Get all pending signups
const pending = await prisma.waitlistSignup.findMany({
  where: { status: 'PENDING' },
  orderBy: { createdAt: 'desc' }
});

// Get test activity for a user
const tests = await prisma.platformTest.findMany({
  where: { email: 'user@example.com' },
  orderBy: { completedAt: 'desc' }
});
```

## Email Notifications

You'll receive beautifully formatted HTML emails with:

### Waitlist Signup Email:
- User email (clickable mailto link)
- Business/DAO name
- Wallet address (if provided)
- Signup timestamp
- Next steps reminder

### Platform Test Email:
- User email
- Test type
- Test details
- Completion timestamp

## Troubleshooting

### Database Connection Issues:
```bash
# Test database connection
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

### Email Not Sending:
1. Check `RESEND_API_KEY` is correct
2. Verify `ADMIN_EMAIL` is set
3. Check server logs for errors
4. Ensure your Resend account is active

### Check Logs:
```bash
# Development
npm run dev

# Check console output for:
# [waitlist] signup created
# [waitlist] Notification email sent to admin
# [platform-test] test logged
```

## Production Deployment

### Environment Variables:
Make sure to set these in your hosting platform (Vercel, Railway, etc.):
- `DATABASE_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `ADMIN_EMAIL`

### Database Migration:
```bash
# Run in production
npx prisma migrate deploy
```

## Cost Breakdown

- **Database (Neon Free Tier):** $0/month
  - 512 MB storage
  - Unlimited queries
  
- **Email (Resend Free Tier):** $0/month
  - 3,000 emails/month
  - 100 emails/day

**Total: FREE** for moderate usage! 🎉

## Support

For issues or questions:
- Check server logs: `npm run dev`
- View database: `npx prisma studio`
- Test email delivery in Resend dashboard
- Contact: hello@gamiprotocol.com
