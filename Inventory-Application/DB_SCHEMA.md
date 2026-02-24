# Inventory App Database Design

## Entities

### 1) categories

- `id` (PK, serial)
- `name` (varchar, required, unique)
- `description` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### 2) items

- `id` (PK, serial)
- `name` (varchar, required)
- `description` (text, optional)
- `price_cents` (integer, required, must be >= 0)
- `stock_quantity` (integer, required, must be >= 0)
- `sku` (varchar, required, unique)
- `category_id` (FK -> categories.id, required)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Relations

- One **category** has many **items**.
- One **item** belongs to exactly one **category**.

## Constraints / Delete Behavior

- `items.category_id` uses `ON DELETE RESTRICT`.
- Result: deleting a category that still has items is blocked.
- App-level behavior: show a friendly message asking user to move/delete category items first.

## Auth-like Protection for Destructive Actions

- The app requires `ADMIN_SECRET_PASSWORD` for:
  - Updating categories/items
  - Deleting categories/items
