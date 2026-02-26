const prisma = require("../db/prisma");

async function showShare(req, res, next) {
  try {
    const share = await prisma.shareLink.findUnique({
      where: { id: req.params.id },
      include: { folder: { include: { files: true } } },
    });

    if (!share || share.expiresAt < new Date()) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    res.render("share/show", {
      title: `Shared folder`,
      share,
      folder: share.folder,
      files: share.folder.files,
    });
  } catch (err) {
    next(err);
  }
}

async function downloadSharedFile(req, res, next) {
  try {
    const share = await prisma.shareLink.findUnique({
      where: { id: req.params.shareId },
      include: { folder: { include: { files: true } } },
    });

    if (!share || share.expiresAt < new Date()) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    const file = share.folder.files.find(
      (item) => item.id === req.params.fileId,
    );
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

module.exports = {
  showShare,
  downloadSharedFile,
};
