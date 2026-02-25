const pool = require("./pool");

// User queries
const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  isAdmin = false,
) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [firstName, lastName, email, hashedPassword, false, isAdmin],
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const updateUserMembershipStatus = async (userId, isMember) => {
  const result = await pool.query(
    "UPDATE users SET is_member = $1 WHERE id = $2 RETURNING *",
    [isMember, userId],
  );
  return result.rows[0];
};

// Message queries
const createMessage = async (title, text, userId) => {
  const result = await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, text, userId],
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.*, users.first_name, users.last_name 
     FROM messages 
     JOIN users ON messages.user_id = users.id 
     ORDER BY messages.created_at DESC`,
  );
  return result.rows;
};

const deleteMessage = async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserMembershipStatus,
  createMessage,
  getAllMessages,
  deleteMessage,
};
