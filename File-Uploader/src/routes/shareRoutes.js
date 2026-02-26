const express = require("express");

const shareController = require("../controllers/shareController");

const router = express.Router();

router.get("/:id", shareController.showShare);
router.get(
  "/:shareId/files/:fileId/download",
  shareController.downloadSharedFile,
);

module.exports = router;
