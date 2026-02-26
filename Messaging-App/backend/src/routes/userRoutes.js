import express from "express";
import {
    getAllUsers,
    getUserProfile,
    searchUsers,
    updateProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/search", authMiddleware, searchUsers);
router.get("/:id", authMiddleware, getUserProfile);
router.put("/:id", authMiddleware, updateProfile);

export default router;
