# Deployment Guide for Where's Waldo

## Backend Deployment

### Option 1: Railway (Recommended - Easiest)

1. Sign up at https://railway.app

2. Create a new PostgreSQL database project

3. Create a Node.js project and connect to your repository

4. Configure environment variables:

   ```
   DATABASE_URL=<from railway postgres>
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.com
   PORT=8000
   ```

5. Deploy! Railway will automatically detect package.json and run `npm start`

### Option 2: Heroku

```bash
# Install Heroku CLI
brew install heroku  # macOS

# Login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app

# Deploy
git push heroku main
```

### Option 3: Render

1. Sign up at https://render.com

2. Create new Web Service

3. Connect GitHub repository

4. Set build command: `npm install` and start command: `npm start`

5. Create PostgreSQL database and link to service

6. Add environment variables

### Option 4: AWS/DigitalOcean/Linode

Use Docker (create `Dockerfile` in backend):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
```

Deploy to your VPS or container service.

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts, set VITE_API_URL environment variable
```

Or connect GitHub repo directly to Vercel dashboard.

### Option 2: Netlify

```bash
# Build
npm run build

# Drag and drop dist/ folder to Netlify
# Or connect GitHub repository
```

Configure environment variable in Netlify dashboard:

```
VITE_API_URL=https://your-backend.com/api
```

### Option 3: GitHub Pages

```bash
# Build
npm run build

# Commit dist/ folder or use gh-pages package
```

Note: GitHub Pages and other static hosts have issues with SPA routing. Use redirect rules or Vercel/Netlify instead.

### Option 4: Your Own Server

```bash
# Build
npm run build

# Copy dist/ to your web server
scp -r dist/* user@yourserver.com:/var/www/html/

# Serve with nginx
# Serve with Apache
# Any static file server
```

## Database Deployment

### PostgreSQL Options

1. **Railway** - Easiest, included in Railway dashboard
2. **Heroku** - Included with app
3. **Render** - Create separate database service
4. **AWS RDS** - Managed PostgreSQL
5. **DigitalOcean** - Managed database clusters
6. **Neon** - Serverless PostgreSQL (great for hobby projects)

### Connection String Format

```
postgresql://username:password@host:port/database_name
```

All hosting platforms will provide this string. Just copy it into your `DATABASE_URL` environment variable.

## Environment Variables Checklist

### Backend

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `NODE_ENV` - "production"
- ✅ `PORT` - Usually 5000 or 8000
- ✅ `FRONTEND_URL` - Your deployed frontend URL (for CORS)

### Frontend

- ✅ `VITE_API_URL` - Your deployed backend API URL (e.g., https://yourblog-api.com/api)

## Full Deployment Example: Railway + Vercel

### 1. Deploy Backend to Railway

```bash
# Push code to GitHub
git push origin main

# On Railway.app:
# - Create new PostgreSQL database
# - Create new Node.js service
# - Connect GitHub repo
# - Railway auto-detects and runs tests

# Environment variables:
# DATABASE_URL = <Railway PostgreSQL URL>
# FRONTEND_URL = https://yourapp.vercel.app
# NODE_ENV = production
```

### 2. Deploy Frontend to Vercel

```bash
# Push code to GitHub if not already done
git push origin main

# On Vercel.com:
# - Import project from GitHub
# - Select frontend directory
# - Add environment variable:
#   VITE_API_URL = https://yourapp-api.up.railway.app/api

# Vercel auto-deploys on push!
```

### 3. Test

1. Visit your Vercel frontend URL
2. Click an image to play
3. If clicking doesn't work, check:
   - Browser console for CORS errors
   - `VITE_API_URL` environment variable
   - Backend logs on Railway

## Troubleshooting Deployment

### "Can't connect to database"

- Check DATABASE_URL is correct
- Ensure database is running and accessible
- Check firewall/security groups allow your backend

### "CORS error in browser"

- Check `FRONTEND_URL` in backend matches exactly (with https://)
- Restart backend after changing env vars
- Check browser console for actual error

### "Images not loading"

- Verify image URLs in database are accessible
- Check HTTPS/HTTP matches (mixed content error)
- Ensure image server has CORS headers

### "Coordinates wrong on deployed site"

- This shouldn't happen if seeded correctly
- Verify same data in production database
- Run migrations: `npx prisma migrate deploy`

## CI/CD Pipeline

For automatic deployment on push, these platforms offer:

- **GitHub Actions** - Free with GitHub
- **Railway** - GitHub integration
- **Vercel** - Automatic on push
- **Netlify** - Automatic on push

## Cost Estimates

- **Railway** - Free tier available (~$5/month for hobby)
- **Vercel** - Free tier available (hobby tier)
- **GitHub Pages** - Free (frontend only)
- **Heroku** - Paid (~$7-50/month now)
- **Render** - Free tier available
- **AWS** - Variable (free tier ~12 months)

## Security Reminders

- Never commit `.env` file with real credentials
- Use environment variables for all secrets
- CORS should only allow your frontend domain
- Input validation on all API endpoints ✅ (already done in this project)
- HTTPS only in production (automatic with Vercel/Railway/Render)

## Next Steps

1. Choose backend hosting (Railway recommended)
2. Choose frontend hosting (Vercel recommended)
3. Create PostgreSQL database
4. Deploy and test
5. Update your high score leaderboard!

Happy deployment! 🚀
