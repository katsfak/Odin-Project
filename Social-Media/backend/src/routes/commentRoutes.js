import { Router } from "express";
import * as commentController from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post(
  "/:postId/comments",
  authMiddleware,
  commentController.createComment,
);
router.get(
  "/:postId/comments",
  authMiddleware,
  commentController.getPostComments,
);
router.delete(
  "/comments/:commentId",
  authMiddleware,
  commentController.deleteComment,
);

export default router;
