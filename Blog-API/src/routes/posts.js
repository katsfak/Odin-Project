const { Router } = require("express");
const postsController = require("../controllers/postsController");
const commentsRouter = require("./comments");
const { authenticate, optionalAuthenticate } = require("../middleware/auth");

const router = Router();

router.get("/", optionalAuthenticate, postsController.listPosts);
router.get("/:id", optionalAuthenticate, postsController.getPost);
router.post("/", authenticate, postsController.createPost);
router.put("/:id", authenticate, postsController.updatePost);
router.delete("/:id", authenticate, postsController.deletePost);

router.use("/:postId/comments", commentsRouter);

module.exports = router;
