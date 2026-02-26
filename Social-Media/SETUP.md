# Setup Instructions for Social Media Platform

## Quick Start (10 minutes)

### Step 1: Create Database

```bash
createdb social_media
```

Or via PostgreSQL CLI:

```bash
psql -c "CREATE DATABASE social_media;"
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env - update DATABASE_URL
# DATABASE_URL="postgresql://user:password@localhost:5432/social_media"

# Run migrations
npm run migrate

# Load sample data (recommended)
npm run seed

# Start backend
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

### Step 4: Test The App

1. Open http://localhost:5173
2. Click "Sign in here" and use:
   - Email: alice@example.com
   - Password: password123
3. Explore features!

## Detailed Setup Guide

### PostgreSQL Installation

**macOS:**

```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

**Docker:**

```bash
docker run --name social-media-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=social_media \
  -p 5432:5432 \
  -d postgres:15

# Update .env:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/social_media"
```

### Environment Variables

**Backend (.env)**

Required:

```
DATABASE_URL="postgresql://user:password@localhost:5432/social_media"
JWT_SECRET="your-secret-key-change-in-production"
```

Optional (defaults work locally):

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

For production, change .env values to:

```
NODE_ENV=production
JWT_SECRET=<strong-random-key>  # Use: openssl rand -base64 32
FRONTEND_URL=https://your-app.vercel.app
```

### Running Both Servers

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

Both must be running. Backend handles `/api` requests, frontend is the UI.

## Feature Walkthrough

### 1. Create Account

1. Go to http://localhost:5173
2. Click "Create an account"
3. Fill in form:
   - Username (3-20 chars, alphanumeric)
   - Email (valid email format)
   - Password (8+ chars, uppercase, lowercase, number)
4. Click "Register"
5. Auto-logged in

### 2. Create Your First Post

1. You're on Feed page
2. Click text area: "What's on your mind?"
3. Type your message (max 500 characters)
4. Optional: Add image URL
5. Click "Post"

### 3. Find Users to Follow

1. Click "Users" in navbar
2. Search for "bob", "charlie", or "diana"
3. Click "Follow" on their card
4. Wait for them to accept (auto-accepts seed users)

### 4. View Your Feed

1. Click "Feed" in navbar
2. See posts from users you follow
3. Like posts with ❤️
4. Click 💬 to expand comments

### 5. Interact with Posts

- **Like:** Click ❤️ heart icon
- **Comment:** Click 💬, type, click Comment
- **Like Comment:** Click ❤️ under comment
- **Delete:** Click ✕ on your own post/comment

### 6. Edit Your Profile

1. Click "Profile" in navbar
2. Click "Edit Profile"
3. Update:
   - Username
   - Bio (optional)
   - Profile Image URL (optional)
4. Click "Save Changes"

### 7. View Other Profiles

1. Click anywhere on a user's name or avatar
2. See their posts, followers, following
3. Click "Follow" to follow them
4. Can click their followers/following to view relationships

## Database Management

### View Database Structure

```bash
cd backend
npm run studio
```

Opens Prisma Studio at http://localhost:5555

Visual database browser to:

- Edit records
- View relationships
- Test queries
- Manage data

### Reset Database

```bash
cd backend
npx prisma migrate reset
# Confirms and runs:
# 1. Drops database
# 2. Creates new database
# 3. Runs migrations
# 4. Seeds sample data
```

### Manual Database Query

```bash
psql social_media

# View tables
\dt

# View users
SELECT id, username, email FROM "User";

# View posts
SELECT id, content, "authorId" FROM "Post";

# Exit
\q
```

## Troubleshooting

### "Cannot connect to database"

Check PostgreSQL is running:

```bash
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Windows - should be running in background
```

Verify DATABASE_URL:

```bash
cd backend
echo $DATABASE_URL
```

### "Port 5000 already in use"

Kill existing process:

```bash
lsof -ti:5000 | xargs kill -9
```

Or change PORT in .env and restart.

### "Port 5173 already in use"

Kill existing process:

```bash
lsof -ti:5173 | xargs kill -9
```

Or use `npm run dev -- --port 5174` to use different port.

### "Migration Failed"

Database might be inconsistent. Reset:

```bash
cd backend
npx prisma migrate reset
npm run seed
```

### Login Not Working

**Check:**

1. Username/email correct
2. Password correct (case-sensitive)
3. Backend is running
4. No browser console errors

**Try:**

- Clear browser cookies/localStorage
- Hard refresh (Ctrl+Shift+R)
- Use incognito window

### Posts Not Appearing

**PostForm issues:**

1. Check content isn't empty
2. Check content under 500 chars
3. Check for red error message
4. Verify image URL is valid (if provided)

**Feed issues:**

1. Follow some users first
2. Refresh page (no real-time sync)
3. Check those users have posts

### Token Errors

Clear localStorage and re-login:

```javascript
// Browser console
localStorage.clear();
location.reload();
```

## Development Tips

### Adding Test Users

Use Prisma Studio (http://localhost:5555) to manually add users:

1. Click "User" table
2. Click "Add record"
3. Fill in:
   - username
   - email
   - passwordHash (hash a password using backend)
4. Save

Or use API:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

### Creating Sample Data

Backend seed already creates:

- 4 users (alice, bob, charlie, diana)
- Follow relationships
- 5 posts from diana
- Comments and likes

Modify `backend/src/db/seed.js` to add more.

### Testing Endpoints

Use curl or tools like Insomnia/Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","email":"new@example.com","password":"SecurePass123","confirmPassword":"SecurePass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get current user (need TOKEN from login response)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Hot Reload

Both servers support hot reload:

- **Backend:** `npm run dev` watches files
- **Frontend:** Vite auto-reloads on save

Changes appear instantly without restarting!

### Debugging

**Frontend debugging:**

1. Open browser DevTools (F12)
2. Console tab shows errors
3. Network tab shows API calls
4. Application tab shows localStorage

**Backend debugging:**

1. Run with `npm run dev`
2. Console logs appear in terminal
3. Check error messages
4. Use `console.log()` for debugging

## Next Steps

1. ✅ Local setup complete
2. 🏗️ Build features (optional extras)
3. 🎨 Style improvements (optional)
4. ✨ Add more features (optional)
5. 🚢 Deploy to production

See [DEPLOYMENT.md](./DEPLOYMENT.md) when ready to go live.

## System Requirements

| Tool       | Version | Download               |
| ---------- | ------- | ---------------------- |
| Node.js    | 16+     | https://nodejs.org     |
| npm        | 7+      | Comes with Node        |
| PostgreSQL | 12+     | https://postgresql.org |
| Git        | Latest  | https://git-scm.com    |

Check installed versions:

```bash
node --version
npm --version
postgres --version
git --version
```

## Ports

Make sure these ports are free:

- **5000** - Backend Express server
- **5173** - Frontend Vite dev server
- **5432** - PostgreSQL database
- **5555** - Prisma Studio (optional)

Change them in respective config files if needed.

## Getting Help

1. Check error message in terminal/console
2. Look at relevant README (frontend/backend)
3. Check troubleshooting section above
4. Review PROJECT_PLAN.md for architecture
5. Check backend/README.md for API details

---

**All set!** Start both servers and visit http://localhost:5173 🎉
