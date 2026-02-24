const pool = require("./pool");

async function getDashboardStats() {
  const [categoryResult, itemResult] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM categories"),
    pool.query("SELECT COUNT(*)::int AS count FROM items"),
  ]);

  return {
    categoryCount: categoryResult.rows[0].count,
    itemCount: itemResult.rows[0].count,
  };
}

async function getAllCategories() {
  const result = await pool.query(
    `
      SELECT c.id, c.name, c.description, COUNT(i.id)::int AS item_count
      FROM categories c
      LEFT JOIN items i ON i.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `,
  );
  return result.rows;
}

async function getCategoryById(id) {
  const categoryResult = await pool.query(
    "SELECT id, name, description FROM categories WHERE id = $1",
    [id],
  );

  if (!categoryResult.rows[0]) return null;

  const itemsResult = await pool.query(
    `
      SELECT id, name, sku, price_cents, stock_quantity
      FROM items
      WHERE category_id = $1
      ORDER BY name ASC
    `,
    [id],
  );

  return {
    ...categoryResult.rows[0],
    items: itemsResult.rows,
  };
}

async function createCategory({ name, description }) {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description || null],
  );
}

async function updateCategory(id, { name, description }) {
  await pool.query(
    `
      UPDATE categories
      SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3
    `,
    [name, description || null, id],
  );
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function getAllItems() {
  const result = await pool.query(
    `
      SELECT i.id, i.name, i.sku, i.price_cents, i.stock_quantity,
             c.id AS category_id, c.name AS category_name
      FROM items i
      JOIN categories c ON c.id = i.category_id
      ORDER BY i.name ASC
    `,
  );
  return result.rows;
}

async function getItemById(id) {
  const result = await pool.query(
    `
      SELECT i.id, i.name, i.description, i.sku, i.price_cents, i.stock_quantity,
             c.id AS category_id, c.name AS category_name
      FROM items i
      JOIN categories c ON c.id = i.category_id
      WHERE i.id = $1
    `,
    [id],
  );
  return result.rows[0] || null;
}

async function createItem({
  name,
  description,
  sku,
  priceCents,
  stockQuantity,
  categoryId,
}) {
  await pool.query(
    `
      INSERT INTO items (name, description, sku, price_cents, stock_quantity, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [name, description || null, sku, priceCents, stockQuantity, categoryId],
  );
}

async function updateItem(
  id,
  { name, description, sku, priceCents, stockQuantity, categoryId },
) {
  await pool.query(
    `
      UPDATE items
      SET name = $1,
          description = $2,
          sku = $3,
          price_cents = $4,
          stock_quantity = $5,
          category_id = $6,
          updated_at = NOW()
      WHERE id = $7
    `,
    [name, description || null, sku, priceCents, stockQuantity, categoryId, id],
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

module.exports = {
  getDashboardStats,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
