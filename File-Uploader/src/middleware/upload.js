const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "..", "uploads", "local");
fs.ensureDirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${safeName}`);
  },
});

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "10485760", 10);
const allowedMimeTypes = (process.env.ALLOWED_MIME_TYPES || "")
  .split(",")
  .map((type) => type.trim())
  .filter(Boolean);

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.length && !allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type"));
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});

module.exports = {
  upload,
  uploadDir,
};
