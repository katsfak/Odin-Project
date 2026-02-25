# Members Only

A message board application with authentication and authorization features. Users can sign up, log in, and post messages. Only members (who know the secret passcode) can see message authors and timestamps. Admins can delete messages.

## Features

- User authentication with Passport.js
- Password hashing with bcrypt
- Form validation and sanitization
- Membership system with secret passcode
- Admin privileges for message deletion
- PostgreSQL database

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a PostgreSQL database named `members_only`

3. Copy `.env.example` to `.env` and update with your database credentials

4. Set up the database tables:

```bash
npm run db:setup
```

5. Start the development server:

```bash
npm run dev
```

6. Visit `http://localhost:3000`

## Usage

- Sign up as a new user
- Log in with your credentials
- Enter the secret passcode to become a member
- Create messages (visible to all)
- Members can see who posted each message
- Admins can delete messages
