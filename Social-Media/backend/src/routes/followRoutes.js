import { Router } from "express";
import * as followController from "../controllers/followController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/request", authMiddleware, followController.sendFollowRequest);
router.put(
  "/:followId/accept",
  authMiddleware,
  followController.acceptFollowRequest,
);
router.delete(
  "/:followId/decline",
  authMiddleware,
  followController.declineFollowRequest,
);
router.delete("/:targetUserId", authMiddleware, followController.unfollow);
router.get(
  "/user/:userId/following",
  authMiddleware,
  followController.getFollowing,
);
router.get(
  "/user/:userId/followers",
  authMiddleware,
  followController.getFollowers,
);
router.get(
  "/requests/pending",
  authMiddleware,
  followController.getPendingRequests,
);
router.get(
  "/status/:targetUserId",
  authMiddleware,
  followController.checkFollowStatus,
);

export default router;
