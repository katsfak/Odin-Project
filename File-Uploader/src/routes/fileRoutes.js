const express = require("express");

const fileController = require("../controllers/fileController");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.use(ensureAuthenticated);

router.get("/:id", fileController.showFile);
router.get("/:id/download", fileController.downloadFile);
router.delete("/:id", fileController.deleteFile);

module.exports = router;
