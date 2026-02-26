import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const EXPIRY = "7d";

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRY });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function decodeToken(token) {
  return jwt.decode(token);
}
