# Setup Instructions for Messaging App

## Quick Start (5 minutes)

### Step 1: Create Database

```bash
createdb messaging_app
```

Or using PostgreSQL CLI:

```bash
psql -c "CREATE DATABASE messaging_app;"
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env - update DATABASE_URL
# DATABASE_URL="postgresql://user:password@localhost:5432/messaging_app"

# Run database migrations
npm run migrate

# Load sample data (optional but recommended)
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

**Test Users (from seed.js):**

```
alice@example.com / password123
bob@example.com / password123
charlie@example.com / password123
diana@example.com / password123
```

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Test the App

1. Open http://localhost:5173 in your browser
2. Login with alice@example.com / password123
3. Explore messaging, friends, and profile features!

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

### Environment Variables

**Backend (.env)**

```
DATABASE_URL="postgresql://user:password@localhost:5432/messaging_app"
JWT_SECRET="your-secret-key-change-in-production"
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend** (.env.local if needed)

```
VITE_API_URL=http://localhost:5000/api
```

### Database Management

**View database structure:**

```bash
cd backend
npm run prisma:studio
```

Opens visual database browser at http://localhost:5555

**Run migrations:**

```bash
npm run migrate
```

**Seed sample data:**

```bash
npm run seed
```

**Reset database (delete all data):**

```bash
npx prisma migrate reset
```

## Running Both Servers

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

Both should be running simultaneously for the app to work.

## Project Features Walkthrough

### 1. Create Account

- Click "Register" on login page
- Fill in username, email, password
- Click "Register"

### 2. Login

- Enter email and password
- Click "Login"
- Token is saved in localStorage

### 3. Send a Message

- Go to "Users" tab
- Search for a user (try "bob" or "charlie")
- Click on user to open chat
- Type message and click "Send"
- **Note:** Message requires page refresh to see responses (no real-time)

### 4. Add a Friend

- Click "Users" tab
- Click on a user
- Go to "Friends" tab
- Click "Add Friend"
- Go to "Requests" tab to manage pending requests
- Accept or reject requests

### 5. Edit Profile

- Click settings icon (⚙️) in top right
- Click "Edit Profile"
- Update username, bio, avatar URL
- Click "Save Changes"

### 6. View Friends

- Click "Friends" tab
- See all friends, online friends, and pending requests
- Click "Message" to chat with a friend
- Click "Remove" to unfriend

## Troubleshooting

### "Cannot connect to database"

```bash
# Check PostgreSQL is running
brew services list  # macOS

# Verify database exists
psql -l

# Check connection string is correct
echo $DATABASE_URL
```

### "Port 5000 already in use"

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### "Port 5173 already in use"

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS errors in browser console

- Verify FRONTEND_URL in backend .env
- Restart backend server after changing .env

### "Unexpected token in JSON"

- Try logging out and back in
- Clear localStorage and reload

### Database migration errors

```bash
# Reset database and re-run migrations
cd backend
npx prisma migrate reset
npm run seed
```

## Important Notes

### Authentication

- Passwords are hashed with bcryptjs (10 rounds)
- JWT tokens expire after 7 days
- Tokens stored in browser localStorage
- Always use HTTPS in production

### Messages

- No real-time updates (REST API only)
- Must refresh page to see new messages
- This is intentional - use Socket.io if you want real-time

### Friends

- Friend requests must be accepted
- Online status updates on login/logout
- Can view online friends separately

### Profiles

- Avatar is URL to image (no upload yet)
- Bio is optional text (max displayed length)
- Can't change email after registration

## Next Steps

1. Complete setup above
2. Test all features
3. Review code in `/backend` and `/frontend`
4. Extend features (see README.md for ideas)
5. Deploy to production (see DEPLOYMENT.md)

## Testing Scenarios

### Scenario 1: Send a Message

1. Login as alice
2. Go to Users tab
3. Search for "bob"
4. Click on bob to open chat
5. Type "Hello Bob!" and send
6. In another browser tab, login as bob
7. Go to Dashboard
8. Click on alice in conversations
9. Refresh to see alice's message

### Scenario 2: Add Friends

1. Login as alice
2. Go to Users tab
3. Search for "charlie"
4. Click "Add Friend"
5. Go to Friends tab → Requests
6. See pending request
7. Login as charlie (new browser tab)
8. Go to Friends tab → Requests
9. See alice's request
10. Click "Accept"
11. Both now see each other in Friends list

### Scenario 3: Edit Profile

1. Login as alice
2. Click settings icon (⚙️)
3. Click "Edit Profile"
4. Change username to "alice_updated"
5. Add bio: "Love coding!"
6. Add avatar: https://i.pravatar.cc/150?img=1
7. Click "Save Changes"
8. Go to Friends tab
9. Click on alice's friend card to see updated profile

## Development Tips

### Using Prisma Studio

```bash
cd backend
npm run prisma:studio
```

Gives visual database management interface.

### Testing API Endpoints

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get users
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Hot Reload

- Backend: `npm run dev` (uses `--watch`)
- Frontend: `npm run dev` (automatic with Vite)

## Docker Setup (Optional)

If you want to run PostgreSQL in Docker:

```bash
docker run --name messaging-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=messaging_app \
  -p 5432:5432 \
  -d postgres:15
```

Then in .env:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/messaging_app"
```

## Production Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- Frontend deployment (Vercel, Netlify)
- Backend deployment (Railway, Render, Heroku)
- Database deployment (Neon, Railway)
- Environment configuration
- HTTPS setup
- Security best practices

---

**You're all set!** 🎉

Start the backend and frontend, then visit http://localhost:5173 to use the messaging app!
