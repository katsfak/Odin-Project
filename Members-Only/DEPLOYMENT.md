# Deployment Guide

## Prerequisites

- A PostgreSQL database
- Node.js environment

## Deploy to Railway

1. Create an account at [Railway.app](https://railway.app)

2. Install Railway CLI or use the web dashboard

3. Create a new project and add a PostgreSQL database

4. Add your GitHub repository or deploy from CLI

5. Set environment variables in Railway dashboard:
   - `SESSION_SECRET`: Generate a random secret key
   - `MEMBER_PASSCODE`: Your secret passcode for members
   - `DATABASE_URL`: Automatically provided by Railway

6. Railway will automatically:
   - Install dependencies
   - Run database migrations (if you add them)
   - Start your application

## Deploy to Render

1. Create an account at [Render.com](https://render.com)

2. Create a new PostgreSQL database

3. Create a new Web Service

4. Connect your GitHub repository

5. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. Set environment variables:
   - `DATABASE_URL`: Copy from your Render PostgreSQL instance (Internal Database URL)
   - `SESSION_SECRET`: Generate a random secret key
   - `MEMBER_PASSCODE`: Your secret passcode for members

7. Add database setup step:
   - After first deployment, run `npm run db:setup` in the Render shell

## Deploy to Heroku

1. Install Heroku CLI

2. Login and create a new app:

   ```bash
   heroku login
   heroku create your-app-name
   ```

3. Add PostgreSQL:

   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. Set environment variables:

   ```bash
   heroku config:set SESSION_SECRET=your-secret-key
   heroku config:set MEMBER_PASSCODE=secret123
   ```

5. Deploy:

   ```bash
   git push heroku main
   ```

6. Set up database:
   ```bash
   heroku run npm run db:setup
   ```

## Environment Variables Reference

| Variable          | Description                   | Example                               |
| ----------------- | ----------------------------- | ------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string  | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET`  | Secret for session encryption | `random-string-here`                  |
| `MEMBER_PASSCODE` | Secret code for membership    | `secret123`                           |
| `PORT`            | Port number (optional)        | `3000`                                |

## Post-Deployment Steps

1. Visit your deployed URL
2. Sign up for an account (check the Admin checkbox to create an admin)
3. Log in
4. Test creating messages
5. Test joining the club with the passcode
6. Test admin delete functionality

## Troubleshooting

- **Database connection errors**: Verify `DATABASE_URL` is correctly set
- **Session issues**: Ensure `SESSION_SECRET` is set
- **Cannot join club**: Check `MEMBER_PASSCODE` environment variable
- **Port already in use**: Change `PORT` environment variable
