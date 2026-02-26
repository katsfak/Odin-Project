# File Uploader

Express + Prisma file uploader with folders, share links, and Cloudinary support.

## Features

- Session auth with Passport
- Folder CRUD
- File upload, download, and details view
- Cloudinary upload with local fallback
- Share links with expiration
- File validation (size and MIME types)

## Setup

1. Install dependencies:
   - `npm install`
2. Create environment file:
   - Copy `.env.example` to `.env`
   - Fill `DATABASE_URL`, `SESSION_SECRET`, and Cloudinary keys if used
3. Initialize database:
   - `npx prisma migrate dev --name init`
4. Start the app:
   - `npm run dev`

Visit http://localhost:3000

## Scripts

- `npm run dev` - start with nodemon
- `npm start` - start with node
- `npm run prisma` - Prisma CLI

## Cloudinary

If Cloudinary keys are set, uploads are stored in Cloudinary and the URL is saved to the database. The local file is still kept in `uploads/local`.

## Validation

- `MAX_FILE_SIZE` and `ALLOWED_MIME_TYPES` are controlled via `.env`.

## License

MIT
