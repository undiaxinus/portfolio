# Supabase Setup Guide for Portfolio Visitor Tracking

## Prerequisites
- Supabase account (free tier available)
- Angular project with @supabase/supabase-js installed

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `portfolio-visitor-tracking` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for project initialization (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API Keys** → **anon public** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Environment Files

### Development Environment (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  ipGeolocationApi: 'https://ipapi.co/json/',
  supabaseUrl: 'YOUR_SUPABASE_PROJECT_URL_HERE',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY_HERE'
};
```

### Production Environment (`src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: '',
  ipGeolocationApi: 'https://ipapi.co/json/',
  supabaseUrl: 'YOUR_SUPABASE_PROJECT_URL_HERE',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY_HERE'
};
```

## Step 4: Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL

## Step 5: Configure Row Level Security (RLS)

The SQL script automatically configures RLS with these policies:
- **Anonymous users**: Can INSERT visitor data (for tracking)
- **Authenticated users**: Can SELECT and DELETE (for admin functions)

## Step 6: Test the Integration

1. Replace the placeholder values in environment files with your actual Supabase credentials
2. Build and run your Angular application:
   ```bash
   ng serve
   ```
3. Visit the homepage to trigger visitor tracking
4. Check Supabase dashboard → **Table Editor** → **visitors** to see the data

## Step 7: Deploy to Production

1. Update production environment with Supabase credentials
2. Build for production:
   ```bash
   ng build --configuration=production
   ```
3. Deploy to your hosting platform (Firebase, Netlify, etc.)

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Double-check your `supabaseAnonKey` in environment files
   - Ensure no extra spaces or characters

2. **"Failed to save visitor" error**
   - Check if RLS policies are properly configured
   - Verify the visitors table exists

3. **CORS errors**
   - Supabase automatically handles CORS for web applications
   - If issues persist, check your domain in Supabase settings

4. **No data appearing**
   - Check browser console for errors
   - Verify environment variables are correctly set
   - Test with development environment first

## Security Notes

- The `anon` key is safe to use in client-side code
- RLS policies ensure data security
- Never expose your `service_role` key in client-side code
- Consider implementing rate limiting for production

## Features Included

✅ Automatic visitor tracking on page load
✅ IP-based geolocation
✅ Duplicate visit prevention (1-hour window)
✅ Admin dashboard integration
✅ Fallback to localStorage if Supabase unavailable
✅ Real-time visitor statistics
✅ Secure data handling with RLS

## Next Steps

After setup:
1. Test visitor tracking functionality
2. Verify admin dashboard shows Supabase data
3. Monitor performance and adjust as needed
4. Consider implementing analytics dashboard