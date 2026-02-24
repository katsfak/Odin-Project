require("dotenv").config();
const pool = require("../db/pool");

const seedSQL = `
  TRUNCATE TABLE items, categories RESTART IDENTITY CASCADE;

  INSERT INTO categories (name, description)
  VALUES
    ('Laptops', 'Portable computers for work and gaming'),
    ('Accessories', 'Peripherals and day-to-day extras'),
    ('Networking', 'Routers, switches, and connectivity gear');

  INSERT INTO items (name, description, sku, price_cents, stock_quantity, category_id)
  VALUES
    ('Ultrabook Pro 14', '14-inch lightweight laptop', 'LAP-ULTRA-14', 129999, 12, 1),
    ('Mechanical Keyboard', 'Hot-swappable 75% keyboard', 'ACC-MECH-75', 8999, 30, 2),
    ('Ergonomic Mouse', 'Wireless ergonomic mouse', 'ACC-MOUSE-ERGO', 4599, 41, 2),
    ('Wi-Fi 6 Router', 'Dual-band Wi-Fi 6 router', 'NET-WIFI6-AX', 11999, 17, 3),
    ('USB-C Dock', 'Dock with HDMI and Ethernet', 'ACC-DOCK-USBC', 9999, 20, 2),
    ('Gaming Laptop 16', 'High-performance gaming laptop', 'LAP-GAME-16', 189999, 7, 1);
`;

async function seed() {
  try {
    await pool.query(seedSQL);
    console.log("Seed complete: dummy categories and items inserted.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
