# Deployment Guide for Social Media Platform

Deploy your app to production with these simple steps.

## Overview

**Frontend** deploys to: Vercel, Netlify, or GitHub Pages
**Backend** deploys to: Railway, Render, Heroku, or DigitalOcean
**Database** deploys to: PostgreSQL cloud (Neon, Railway, AWS RDS)

Recommended: **Vercel (frontend) + Railway (backend + database)**

## Backend Deployment

### Option 1: Railway (Recommended - Easiest)

**Pros:** Free tier, PostgreSQL included, one-click deploy
**Cons:** Limited free tier

1. **Sign up:** https://railway.app

2. **Create PostgreSQL Database:**
   - New Project → Add PostgreSQL
   - Copy DATABASE_URL from connect tab

3. **Deploy Backend:**
   - New Project → GitHub → Select your repo
   - Select `/backend` folder as root
   - Environment variables:
     ```
     DATABASE_URL=postgresql://user:password@host/db
     JWT_SECRET=<generate: openssl rand -base64 32>
     NODE_ENV=production
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Deploy

4. **Get Domain:**
   - Copy URL from Railway dashboard (e.g., `https://app-name.up.railway.app`)

### Option 2: Render.com (Also Good)

1. **Sign up:** https://render.com

2. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Copy connection string

3. **Deploy Node Service:**
   - New → Web Service
   - Connect GitHub
   - Build command: `npm install`
   - Start command: `npm start` (or `node src/server.js`)
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

# Set environment
heroku config:set JWT_SECRET="random-key"
heroku config:set FRONTEND_URL="https://your-frontend.vercel.app"

# Deploy
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. Create PostgreSQL database
2. Create App Platform application
3. Connect GitHub repo
4. Set environment variables
5. Deploy

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Pros:** Free, fast, integrates with Next.js and Vite, auto-deploys on push
**Cons:** Limited free tier for pro features

1. **Sign up:** https://vercel.com

2. **Deploy:**
   - Import Git repo
   - Select `/frontend` folder
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend.up.railway.app/api
     ```
   - Deploy

3. **Your site:** `https://your-app.vercel.app`

4. **Auto-deploys:** Every push to main branch redeploys

### Option 2: Netlify

```bash
# install netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or connect GitHub in Netlify dashboard.

### Option 3: GitHub Pages

```bash
npm run build
# Deploy dist/ folder as GitHub Pages
```

**Note:** Works but requires SPA routing configuration.

## Complete Step-by-Step

### 1. Prepare Code

```bash
# Ensure everything is committed
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Deploy Backend (Railway)

1. Go to https://railway.app
2. New Project → GitHub
3. Select your repository
4. Configure:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
5. Environment Variables:
   - `DATABASE_URL` - From PostgreSQL service
   - `JWT_SECRET` - Generate random key
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your Vercel URL (update after step 3)
6. Deploy

**Copy backend URL** (e.g., `app-123.up.railway.app`)

### 3. Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. New Project → Import Git repository
3. Configure:
   - Framework: Vite
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Environment Variables:
   - `VITE_API_URL` - `https://your-backend-url/api`
5. Deploy

**Your site is live!** 🎉

### 4. Connect Backend to Frontend

Update Railway environment:

1. Go to Railway dashboard
2. Your project → Variables
3. Update `FRONTEND_URL` to your Vercel URL
4. Redeploy

### 5. Test

1. Visit your Vercel URL
2. Register new account
3. Login
4. Create post
5. Follow another test user
6. Like and comment

Everything should work!

## Environment Variables

### Backend Checklist

```
✅ DATABASE_URL      - PostgreSQL connection
✅ JWT_SECRET        - Random 32+ char string
✅ NODE_ENV          - "production"
✅ PORT              - Usually auto-assigned or 5000
✅ FRONTEND_URL      - Your frontend deployment URL
```

### Frontend Checklist

```
✅ VITE_API_URL      - Your backend URL + /api
```

## Database Backups

### Railway

- Automatic backups included
- View in dashboard

### Render

- Automatic backups included

### Manual Backup

```bash
pg_dump -h host -U user -d database > backup.sql
```

## Monitoring & Logs

### Railway

- View logs in dashboard (real-time)
- Metrics available
- Error notifications

### Vercel

- Log page visible
- Analytics available
- Error alerts

## Updated Environment After Deploy

**Backend Production:**

- DATABASE_URL: Cloud PostgreSQL
- JWT_SECRET: Strong random key
- FRONTEND_URL: Vercel domain
- NODE_ENV: production

**Frontend Production:**

- VITE_API_URL: Cloud backend domain + /api

## Troubleshooting

### "Cannot connect to database"

- Verify DATABASE_URL is correct
- Check database exists
- Verify firewall allows connection
- Check credentials

### Frontend CORS errors

- Verify FRONTEND_URL in backend matches exactly
- Check API endpoint is accessible
- Hard refresh browser (Ctrl+Shift+R)

### API 404s

- Check backend is running
- Verify VITE_API_URL includes `/api`
- Check endpoint paths match

### Build fails

- Check dependencies installed
- Verify Node version 16+
- Check environment variables set
- Check build command correct

### Login not working

- Clear localStorage and cookies
- Check JWT_SECRET is strong
- Verify database connection works
- Check users table exists

## Cost Estimates

| Service | Cost      | Notes                     |
| ------- | --------- | ------------------------- |
| Railway | $5-20/mo  | PostgreSQL + Node app     |
| Vercel  | Free tier | Great for hobby projects  |
| Render  | $7-12/mo  | PostgreSQL + App          |
| Heroku  | $7/mo     | Classic option (now paid) |

**Minimum setup:** ~$5-7/month (Railway + Vercel free)

## Security Checklist

Before going live:

- [ ] JWT_SECRET is strong (32+ random chars)
- [ ] Database password is strong
- [ ] No secrets in code
- [ ] CORS configured correctly
- [ ] HTTPS enabled (auto on Vercel/Railway)
- [ ] Frontend doesn't expose backend URL
- [ ] SQL injections prevented (Prisma handles this)
- [ ] Password hashing enabled (bcrypt 10 rounds)
- [ ] Rate limiting (optional, add later)

## Post-Deployment

1. **Test everything:**
   - Register account
   - Login/logout
   - Create post
   - Follow user
   - Like/comment
   - Edit profile

2. **Monitor:**
   - Check logs regularly
   - Set up error alerts
   - Monitor database

3. **Update:**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular backups
   - Version control

4. **Share:**
   - Tell friends/family
   - Add to portfolio
   - Put in resume
   - Share on social media!

## Update Deployment

To update the live app:

```bash
# Make changes locally
git add .
git commit -m "Feature: add xyz"
git push origin main

# Auto-deploys on Vercel
# Manual redeploy on Railway if needed
```

## Custom Domain (Optional)

### Vercel

1. Go to project settings
2. Domains section
3. Add custom domain
4. Update DNS records

### Railway

1. Go to project settings
2. Networking
3. Add custom domain
4. Update DNS records

## Useful Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Prisma Deploy Guide](https://www.prisma.io/docs/guides/deployment)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## Getting Help

1. Check railway/vercel logs
2. Check backend/frontend README
3. Test locally first
4. Check build command
5. Verify environment variables

---

**Congratulations on deploying!** 🚀

Share your live app and add it to your portfolio!
