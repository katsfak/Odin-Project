import { Router } from "express";
import * as postController from "../controllers/postController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, postController.createPost);
router.get("/feed", authMiddleware, postController.getFeedPosts);
router.get("/user/:userId", authMiddleware, postController.getUserPosts);
router.get("/:postId", authMiddleware, postController.getPost);
router.delete("/:postId", authMiddleware, postController.deletePost);

export default router;
