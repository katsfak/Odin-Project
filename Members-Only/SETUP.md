# Members Only - Project Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd Members-Only
npm install
```

### 2. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**

1. Install PostgreSQL on your system
2. Create a database:
   ```bash
   createdb members_only
   ```
3. Update `.env` with your database credentials

**Option B: Use Docker**

```bash
docker run --name members-only-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=members_only -p 5432:5432 -d postgres
```

### 3. Configure Environment Variables

The `.env` file has been created with default values. Update if needed:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/members_only
SESSION_SECRET=your-super-secret-session-key-change-this
MEMBER_PASSCODE=secret123
PORT=3000
```

### 4. Initialize Database Tables

```bash
npm run db:setup
```

### 5. Start the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 6. Access the Application

Open your browser and go to: http://localhost:3000

## Testing the Application

### Test User Flow

1. **Sign Up**: Create a new account at `/auth/signup`
   - Fill in first name, last name, email, and password
   - Optionally check "Sign up as Admin" for admin privileges
2. **Log In**: Use your credentials at `/auth/login`

3. **Create a Message**: Go to `/message/new`
   - Add a title and message text
   - Submit to post to the home page

4. **Join as Member**: Visit `/member/join`
   - Enter the passcode from `.env` (default: `secret123`)
   - Now you'll see message authors and dates

5. **Admin Features** (if you signed up as admin):
   - Delete any message using the delete button

## Project Structure

```
Members-Only/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment file
├── .gitignore            # Git ignore rules
├── README.md             # Project overview
├── DEPLOYMENT.md         # Deployment instructions
├── SETUP.md              # This file
├── config/
│   └── passport.js       # Passport authentication config
├── db/
│   ├── pool.js           # PostgreSQL connection pool
│   └── queries.js        # Database query functions
├── routes/
│   ├── index.js          # Home page routes
│   ├── auth.js           # Sign up/login/logout routes
│   ├── message.js        # Message CRUD routes
│   └── member.js         # Membership routes
├── views/
│   ├── index.ejs         # Home page template
│   ├── signup.ejs        # Sign up form
│   ├── login.ejs         # Login form
│   ├── new-message.ejs   # Create message form
│   ├── join-club.ejs     # Join club form
│   └── error.ejs         # Error page
├── public/
│   └── styles.css        # Application styles
└── scripts/
    └── setupDb.js        # Database initialization script
```

## Features Implemented

✅ User authentication with Passport.js  
✅ Password hashing with bcrypt  
✅ Form validation and sanitization  
✅ Sign up with first name, last name, email, password  
✅ Confirm password validation  
✅ Membership system with secret passcode  
✅ Message creation with title, text, and timestamp  
✅ Conditional visibility (members see authors)  
✅ Admin privileges with delete functionality  
✅ Admin checkbox on sign-up form  
✅ PostgreSQL database with proper relationships  
✅ Responsive design with modern UI  
✅ Session management  
✅ Error handling

## Database Schema

### Users Table

- id (SERIAL PRIMARY KEY)
- first_name (VARCHAR 100)
- last_name (VARCHAR 100)
- email (VARCHAR 255 UNIQUE)
- password (VARCHAR 255) - hashed
- is_member (BOOLEAN)
- is_admin (BOOLEAN)
- created_at (TIMESTAMP)

### Messages Table

- id (SERIAL PRIMARY KEY)
- title (VARCHAR 255)
- text (TEXT)
- user_id (INTEGER FK → users.id)
- created_at (TIMESTAMP)

## Environment Variables

| Variable        | Description                   | Required           |
| --------------- | ----------------------------- | ------------------ |
| DATABASE_URL    | PostgreSQL connection string  | Yes                |
| SESSION_SECRET  | Secret for session encryption | Yes                |
| MEMBER_PASSCODE | Secret code for membership    | Yes                |
| PORT            | Server port number            | No (default: 3000) |

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- Session-based authentication
- Secure session cookies
- SQL injection prevention via parameterized queries
- XSS prevention via input sanitization and escaping
- CSRF protection via express-session

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists: `createdb members_only`

### Port Already in Use

- Change PORT in `.env`
- Or kill the process using port 3000

### Cannot Login

- Verify user exists in database
- Check password was hashed correctly
- Clear browser cookies and try again

### Session Issues

- Ensure SESSION_SECRET is set in `.env`
- Restart the server after changing `.env`

## Development Commands

```bash
# Install dependencies
npm install

# Run in development mode (auto-restart)
npm run dev

# Run in production mode
npm start

# Set up database tables
npm run db:setup
```

## Next Steps

1. Customize the member passcode in `.env`
2. Add more validation rules as needed
3. Implement password reset functionality
4. Add user profile pages
5. Deploy to a PaaS (see DEPLOYMENT.md)
6. Add rate limiting for security
7. Implement email verification

## Support

For issues or questions:

- Check the README.md for overview
- See DEPLOYMENT.md for deployment help
- Review the code comments in each file
