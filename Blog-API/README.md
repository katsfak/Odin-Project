# Blog API

Express + Prisma + JWT backend for a blog with posts and comments.

## Tech

- Node.js + Express
- Prisma + PostgreSQL
- JWT auth

## Setup

1. Copy env file and edit values:
   - `cp .env.example .env`
2. Install deps:
   - `npm install`
3. Run migrations:
   - `npx prisma migrate dev`
4. Seed admin user:
   - `npm run seed`
5. Start server:
   - `npm run dev`

## Environment

- `DATABASE_URL` Postgres connection string
- `JWT_SECRET` secret for signing tokens
- `ADMIN_EMAIL` admin login email
- `ADMIN_PASSWORD` admin login password
- `PORT` server port

## API

### Auth

- `POST /auth/login`

### Posts

- `GET /posts` (public)
- `GET /posts/:id` (public, only published)
- `POST /posts` (auth)
- `PUT /posts/:id` (auth)
- `DELETE /posts/:id` (auth)

### Comments

- `GET /posts/:postId/comments` (public, only if post published)
- `POST /posts/:postId/comments` (public, only if post published)
- `DELETE /posts/:postId/comments/:commentId` (auth)

## Notes

- Include JWT in `Authorization: Bearer <token>` for protected routes.
