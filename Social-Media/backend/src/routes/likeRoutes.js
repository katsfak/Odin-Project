import { Router } from "express";
import * as likeController from "../controllers/likeController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/posts/:postId/like", authMiddleware, likeController.likePost);
router.delete("/posts/:postId/like", authMiddleware, likeController.unlikePost);
router.post(
  "/comments/:commentId/like",
  authMiddleware,
  likeController.likeComment,
);
router.delete(
  "/comments/:commentId/like",
  authMiddleware,
  likeController.unlikeComment,
);

export default router;
