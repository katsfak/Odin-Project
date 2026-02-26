# Deployment Guide for Messaging App

## Backend Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up at https://railway.app**

2. **Create PostgreSQL database:**
   - New Project → PostgreSQL
   - Get connection string

3. **Deploy backend:**
   - New Project → GitHub
   - Connect your repo
   - Select `backend` directory

4. **Set environment variables:**
   - `DATABASE_URL` - From PostgreSQL database
   - `JWT_SECRET` - Generate random: `openssl rand -base64 32`
   - `NODE_ENV` - production
   - `FRONTEND_URL` - Your deployed frontend URL

5. **Deploy!**
   - Railway auto-deploys or push to GitHub

Get your backend URL from Railway dashboard (e.g., `https://app-name.up.railway.app`)

### Option 2: Render

1. **Sign up at https://render.com**

2. **Create PostgreSQL database:**
   - New → PostgreSQL
   - Copy database URL

3. **Deploy Node.js service:**
   - New → Web Service
   - Connect GitHub
   - Build command: `npm install`
   - Start command: `npm start`
   - Set environment variables
   - Deploy

### Option 3: Heroku

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment vars
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set FRONTEND_URL="https://your-frontend.com"

# Deploy
git push heroku main
```

### Option 4: DigitalOcean/Linode App Platform

1. Create PostgreSQL database
2. Create App Platform application
3. Connect GitHub repo
4. Set environment variables
5. Deploy

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# From frontend directory
cd frontend
npm run build
vercel

# Follow prompts
```

Or connect GitHub repo directly in Vercel dashboard.

**Set environment variable:**

- `VITE_API_URL` = Your backend URL (e.g., `https://app.up.railway.app/api`)

### Option 2: Netlify

```bash
# Build
npm run build

# Deploy dist folder with Netlify CLI or drag & drop
netlify deploy --prod --dir=dist
```

Or connect GitHub repo in Netlify dashboard.

### Option 3: GitHub Pages (Static)

```bash
# Note: GitHub Pages hosts static content only
# Your routes should still work with proper SPA configuration

npm run build
# Deploy dist/ to GitHub Pages
```

Configure for SPA routing in build settings.

## Complete Deployment Walkthrough

### Step 1: Database (Railway PostgreSQL)

1. Go to railway.app
2. New Project → PostgreSQL
3. Copy DATABASE_URL from connect tab
4. Note: `postgresql://user:password@domain:port/database`

### Step 2: Backend (Railway Node.js)

1. New Project → GitHub
2. Select your repo
3. Set `Root Directory` → `backend`
4. Environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=<generate with openssl>
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Deploy

Get backend URL: Check Railway dashboard project settings

### Step 3: Frontend (Vercel)

1. Go to vercel.com
2. Import Git Repository
3. Select your repo
4. Set `Root Directory` → `frontend`
5. Environment variables:
   ```
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```
6. Deploy

Frontend URL auto-generated: `https://your-app.vercel.app`

### Step 4: Update Configuration

After getting backend and frontend URLs:

**Update backend .env:**

```
FRONTEND_URL=https://your-app.vercel.app
```

**Update frontend configuration** (if needed):

- Vercel environment variables are deployed
- No code changes needed if using /api proxy

## Environment Variables Checklist

### Backend Required

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `JWT_SECRET` - Random secret (min 32 chars)
- ✅ `NODE_ENV` - "production"
- ✅ `PORT` - Usually 5000 or auto-assigned
- ✅ `FRONTEND_URL` - Your frontend deployment URL

### Frontend Required

- ✅ `VITE_API_URL` - Your backend API URL (e.g., `https://api.example.com/api`)

## Database Migration

After deploying backend:

```bash
# SSH into server or use CLI
npx prisma migrate deploy

# Or if needed
npx prisma db push
```

Or configure auto-migration on deploy (Railway does this by default).

## Seed Production Database

After first deployment:

```bash
# Option 1: Using your CLI
heroku run npm run seed  # If using Heroku

# Option 2: Manually create test users
# Use your app's register feature
```

## Custom Domain Setup

### Vercel Frontend

1. Go to project settings
2. Domains section
3. Add custom domain
4. Update DNS records

### Railway Backend

1. Go to project settings
2. Networking
3. Add custom domain
4. Update DNS records

## Monitoring & Logging

### Railway

- View logs in dashboard
- Real-time error tracking
- Resource usage monitoring

### Vercel

- Analytics tab
- Error tracking
- Performance monitoring

## SSL/HTTPS

All major platforms (Railway, Vercel, Render) provide free HTTPS automatically.

**Manual SSL (if on DIY server):**

```bash
# Use Let's Encrypt with Certbot
certbot certonly --standalone -d yourdomain.com
```

## Performance Optimization

### Backend

```bash
# Build for production
npm run build  # If using build step

# Use environment variables for optimization
NODE_ENV=production
```

### Frontend

```bash
# Build creates optimized dist/
npm run build

# Vite automatically optimizes:
# - Code splitting
# - Tree shaking
# - Minification
# - Source maps excluded in prod
```

## Maintenance

### Backups

- **Railway:** Auto-backups included
- **AWS RDS:** Enable automated backups
- **Manual:** `pg_dump` PostgreSQL databases regularly

### Updates

- Keep dependencies updated
- Monitor security advisories
- Test updates in staging

### Monitoring

- Set up error tracking (Sentry)
- Monitor API response times
- Alert on high error rates

## Cost Estimates

- **Vercel Frontend:** Free tier available
- **Railway Backend & DB:** Full demo tier free (~$5/month after)
- **Render:** Free tier available
- **Total:** $0-$15/month for hobby project

## Troubleshooting Deployment

### "Cannot connect to database"

- Verify DATABASE_URL is correct
- Check database is running
- Ensure firewall allows connection

### "Front-end CORS errors"

- Verify FRONTEND_URL in backend matches exactly
- Check API endpoint is accessible
- Ensure VITE_API_URL is set correctly

### "Missing dependencies"

- Ensure package.json lock file is committed
- Check npm install works locally
- Verify Node/npm versions match

### "Database migrations failed"

- Check DATABASE_URL is correct
- Run migrations locally first
- Verify schema is compatible

## Post-Deployment

1. **Test all features:**
   - Register new account
   - Login/logout
   - Send messages
   - Add friends
   - Edit profile

2. **Test on mobile** - Ensure responsive

3. **Monitor logs** - Check for errors

4. **Update passwords** - Change default JWT_SECRET weekly

5. **Backup database** - Set up automatic backups

## Next Steps

1. Choose hosting providers
2. Set up databases
3. Deploy backend
4. Deploy frontend
5. Verify everything works
6. Share your app!

See individual provider docs for platform-specific features.

---

**Happy deploying!** 🚀
