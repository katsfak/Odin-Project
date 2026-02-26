const fs = require("fs-extra");
const prisma = require("../db/prisma");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary");
const { removeFileIfExists, formatBytes } = require("../utils/fileHelpers");

async function uploadFile(req, res, next) {
  if (!req.file) {
    req.flash("error", "Please select a file to upload.");
    return res.redirect(`/folders/${req.params.id}`);
  }

  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!folder) {
      await removeFileIfExists(req.file.path);
      return res.status(404).render("404", { title: "Not Found" });
    }

    let cloud = null;
    try {
      cloud = await uploadToCloudinary(req.file.path);
    } catch (err) {
      req.flash("error", "Cloud upload failed. File saved locally.");
    }

    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        storagePath: req.file.path,
        url: cloud ? cloud.url : null,
        cloudinaryPublicId: cloud ? cloud.publicId : null,
        folderId: folder.id,
        userId: req.user.id,
      },
    });

    req.flash("success", "File uploaded.");
    res.redirect(`/folders/${folder.id}`);
  } catch (err) {
    next(err);
  }
}

async function showFile(req, res, next) {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.id, userId: req.user.id },
      include: { folder: true },
    });

    if (!file) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    res.render("files/show", {
      title: file.name,
      file: { ...file, sizeLabel: formatBytes(file.size) },
    });
  } catch (err) {
    next(err);
  }
}

async function downloadFile(req, res, next) {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!file) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    if (file.storagePath && (await fs.pathExists(file.storagePath))) {
      return res.download(file.storagePath, file.name);
    }

    if (file.url) {
      return res.redirect(file.url);
    }

    return res.status(404).render("404", { title: "Not Found" });
  } catch (err) {
    next(err);
  }
}

async function deleteFile(req, res, next) {
  try {
    const file = await prisma.file.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!file) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    if (file.storagePath) {
      await removeFileIfExists(file.storagePath);
    }

    if (file.cloudinaryPublicId) {
      await deleteFromCloudinary(file.cloudinaryPublicId);
    }

    await prisma.file.delete({ where: { id: file.id } });

    req.flash("success", "File deleted.");
    res.redirect(`/folders/${file.folderId}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  uploadFile,
  showFile,
  downloadFile,
  deleteFile,
};
