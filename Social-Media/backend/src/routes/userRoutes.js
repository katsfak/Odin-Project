import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/search", authMiddleware, userController.searchUsers);
router.get("/:userId", authMiddleware, userController.getUserProfile);
router.put("/:userId", authMiddleware, (req, res) => {
  if (req.params.userId !== req.userId) {
    return res
      .status(403)
      .json({ error: "Cannot edit another user's profile" });
  }
  userController.updateProfile(req, res);
});

export default router;
