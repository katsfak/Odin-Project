# Inventory Application

Inventory management app built with Express, PostgreSQL, and EJS.

## 1) Database planning (tables, fields, relations)

See [DB_SCHEMA.md](./DB_SCHEMA.md).

Summary:

- `categories`: inventory groups (`name`, `description`)
- `items`: inventory records (`name`, `sku`, `price_cents`, `stock_quantity`, `category_id`)
- Relation: one category has many items
- Delete behavior: category deletion is blocked while category has items (`ON DELETE RESTRICT`)

## 2) Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Create PostgreSQL role + DB (example):
   ```bash
   sudo -u postgres psql
   CREATE USER inventory_user WITH PASSWORD 'inventory_password';
   CREATE DATABASE inventory_app OWNER inventory_user;
   \q
   ```
4. Run schema migration and seed data:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

## 3) Routes and controllers

- Home: `GET /`
- Categories:
  - `GET /categories`
  - `GET /categories/new`
  - `POST /categories/new`
  - `GET /categories/:id`
  - `GET /categories/:id/edit`
  - `PUT /categories/:id/edit`
  - `DELETE /categories/:id`
- Items:
  - `GET /items`
  - `GET /items/new`
  - `POST /items/new`
  - `GET /items/:id`
  - `GET /items/:id/edit`
  - `PUT /items/:id/edit`
  - `DELETE /items/:id`

## 4) Admin password protection

`ADMIN_SECRET_PASSWORD` is required for:

- Update category/item
- Delete category/item

You set it in `.env` and provide it in the form fields shown on update/delete views.

## 5) Deploy

### Option A: Render (Blueprint)

This project includes [render.yaml](./render.yaml).

1. Push this project to GitHub.
2. In Render, create a Blueprint from your repository.
3. Set `ADMIN_SECRET_PASSWORD` when prompted.
4. After first deploy, run in Render shell:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

### Option B: Render (manual Web Service + PostgreSQL)

1. Push this project to GitHub.
2. Create a Render PostgreSQL database.
3. Create a new Render Web Service for this repo.
4. Add environment variables in Render:
   - `PORT` (Render provides this automatically)
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `ADMIN_SECRET_PASSWORD`
5. Set build command:
   ```bash
   npm install
   ```
6. Set start command:
   ```bash
   npm start
   ```
7. Run migration + seed once against the deployed DB:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

After deploy, share your app URL.
