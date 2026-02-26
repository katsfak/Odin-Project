const cloudinary = require("cloudinary").v2;

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

async function uploadToCloudinary(filePath) {
  if (!isCloudinaryConfigured()) {
    return null;
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder: process.env.CLOUDINARY_FOLDER || "odin-file-uploader",
    resource_type: "raw",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

async function deleteFromCloudinary(publicId) {
  if (!isCloudinaryConfigured() || !publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  isCloudinaryConfigured,
};
