const express = require("express");

const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");
const { ensureAuthenticated } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { folderValidator, shareValidator } = require("../middleware/validators");

const router = express.Router();

router.use(ensureAuthenticated);

router.get("/", folderController.listFolders);
router.post("/", folderValidator, folderController.createFolder);
router.get("/:id", folderController.showFolder);
router.get("/:id/edit", folderController.editFolder);
router.put("/:id", folderValidator, folderController.updateFolder);
router.delete("/:id", folderController.deleteFolder);
router.post("/:id/share", shareValidator, folderController.createShare);
router.post("/:id/files", upload.single("file"), fileController.uploadFile);

module.exports = router;
