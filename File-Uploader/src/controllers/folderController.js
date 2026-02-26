const { validationResult } = require("express-validator");
const prisma = require("../db/prisma");
const { parseDurationToMs } = require("../utils/duration");
const { removeFileIfExists, formatBytes } = require("../utils/fileHelpers");

async function listFolders(req, res, next) {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { files: true } },
      },
    });

    res.render("folders/index", { title: "Your folders", folders });
  } catch (err) {
    next(err);
  }
}

async function createFolder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { files: true } } },
    });

    return res.status(400).render("folders/index", {
      title: "Your folders",
      folders,
      errors: errors.array(),
      form: req.body,
    });
  }

  try {
    await prisma.folder.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    req.flash("success", "Folder created.");
    res.redirect("/folders");
  } catch (err) {
    next(err);
  }
}

async function showFolder(req, res, next) {
  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    const files = folder.files.map((file) => ({
      ...file,
      sizeLabel: formatBytes(file.size),
    }));

    res.render("folders/show", {
      title: folder.name,
      folder,
      files,
    });
  } catch (err) {
    next(err);
  }
}

async function editFolder(req, res, next) {
  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!folder) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    res.render("folders/edit", { title: "Edit folder", folder, errors: [] });
  } catch (err) {
    next(err);
  }
}

async function updateFolder(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("folders/edit", {
      title: "Edit folder",
      folder: { id: req.params.id, name: req.body.name },
      errors: errors.array(),
    });
  }

  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!folder) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    await prisma.folder.update({
      where: { id: folder.id },
      data: { name: req.body.name },
    });

    req.flash("success", "Folder updated.");
    res.redirect(`/folders/${folder.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteFolder(req, res, next) {
  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    for (const file of folder.files) {
      if (file.storagePath) {
        await removeFileIfExists(file.storagePath);
      }
    }

    await prisma.folder.delete({ where: { id: folder.id } });

    req.flash("success", "Folder deleted.");
    res.redirect("/folders");
  } catch (err) {
    next(err);
  }
}

async function createShare(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.redirect(`/folders/${req.params.id}`);
  }

  try {
    const folder = await prisma.folder.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!folder) {
      return res.status(404).render("404", { title: "Not Found" });
    }

    const durationMs = parseDurationToMs(req.body.duration);
    if (!durationMs) {
      req.flash("error", "Invalid duration value.");
      return res.redirect(`/folders/${req.params.id}`);
    }

    const expiresAt = new Date(Date.now() + durationMs);
    const share = await prisma.shareLink.create({
      data: {
        folderId: folder.id,
        expiresAt,
      },
    });

    const shareUrl = `${req.protocol}://${req.get("host")}/share/${share.id}`;
    req.flash("shareLink", shareUrl);
    req.flash("success", "Share link created.");
    res.redirect(`/folders/${folder.id}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listFolders,
  createFolder,
  showFolder,
  editFolder,
  updateFolder,
  deleteFolder,
  createShare,
};
