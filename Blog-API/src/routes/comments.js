const { Router } = require("express");
const commentsController = require("../controllers/commentsController");
const { authenticate, optionalAuthenticate } = require("../middleware/auth");

const router = Router({ mergeParams: true });

router.get("/", optionalAuthenticate, commentsController.listComments);
router.post("/", optionalAuthenticate, commentsController.createComment);
router.delete("/:commentId", authenticate, commentsController.deleteComment);

module.exports = router;
