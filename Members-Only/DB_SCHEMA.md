# Database Schema

## Overview

This document describes the database schema for the Members Only application using PostgreSQL.

## Tables

### users

Stores user account information including authentication credentials and authorization levels.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**

- `id`: Unique identifier for each user (auto-incrementing)
- `first_name`: User's first name
- `last_name`: User's last name
- `email`: User's email address (used for login, must be unique)
- `password`: Hashed password using bcrypt
- `is_member`: Boolean flag indicating if user has member privileges
- `is_admin`: Boolean flag indicating if user has admin privileges
- `created_at`: Timestamp of account creation

**Indexes:**

- Primary key on `id`
- Unique constraint on `email`

### messages

Stores all messages posted by users.

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**

- `id`: Unique identifier for each message (auto-incrementing)
- `title`: Message title/subject
- `text`: Message content/body
- `user_id`: Foreign key referencing the user who created the message
- `created_at`: Timestamp of message creation

**Indexes:**

- Primary key on `id`
- Foreign key on `user_id` referencing `users(id)`

**Constraints:**

- ON DELETE CASCADE: When a user is deleted, all their messages are automatically deleted

## Relationships

```
users (1) ──< (many) messages
```

- One user can create many messages
- Each message belongs to exactly one user
- Cascade delete: deleting a user deletes all their messages

## Authorization Levels

### Regular User (is_member=false, is_admin=false)

- Can view all messages
- Cannot see message authors or timestamps
- Can create messages after logging in

### Member (is_member=true, is_admin=false)

- All regular user privileges
- Can see message authors and timestamps
- Gained by entering the secret member passcode

### Admin (is_member=true, is_admin=true)

- All member privileges
- Can delete any message
- Can be set during signup or via database update

## Security Considerations

1. **Password Storage**: Passwords are hashed using bcrypt with 10 salt rounds
2. **SQL Injection**: All queries use parameterized statements via node-postgres
3. **Cascade Deletion**: Foreign key constraints maintain referential integrity
4. **Email Uniqueness**: Prevents duplicate accounts

## Sample Queries

### Create a new user

```sql
INSERT INTO users (first_name, last_name, email, password, is_member, is_admin)
VALUES ('John', 'Doe', 'john@example.com', '$2a$10$...', false, false);
```

### Find user by email

```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

### Update membership status

```sql
UPDATE users SET is_member = true WHERE id = 1;
```

### Create a message

```sql
INSERT INTO messages (title, text, user_id)
VALUES ('My First Post', 'Hello, world!', 1);
```

### Get all messages with author info

```sql
SELECT messages.*, users.first_name, users.last_name
FROM messages
JOIN users ON messages.user_id = users.id
ORDER BY messages.created_at DESC;
```

### Delete a message

```sql
DELETE FROM messages WHERE id = 1;
```

## Migrations

To set up the database schema, run:

```bash
npm run db:setup
```

This executes the `scripts/setupDb.js` file which creates both tables with proper constraints.

## Future Enhancements

Potential schema additions:

- User profiles table with bio, avatar, etc.
- Comments/replies to messages
- Message likes or reactions
- User roles table for more granular permissions
- Password reset tokens table
- Email verification tokens
- Activity logs/audit trail
