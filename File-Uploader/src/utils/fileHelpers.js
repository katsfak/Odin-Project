const fs = require("fs-extra");

async function removeFileIfExists(filePath) {
  if (!filePath) {
    return;
  }

  try {
    await fs.remove(filePath);
  } catch (err) {
    console.warn("Failed to remove file", err.message);
  }
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) {
    return "-";
  }

  if (bytes === 0) {
    return "0 B";
  }

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = (bytes / Math.pow(k, i)).toFixed(1);
  return `${value} ${sizes[i]}`;
}

module.exports = {
  removeFileIfExists,
  formatBytes,
};
