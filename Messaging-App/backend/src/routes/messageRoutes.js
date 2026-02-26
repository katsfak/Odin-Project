import express from "express";
import {
    deleteMessage,
    getConversation,
    getConversations,
    sendMessage,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/conversations", authMiddleware, getConversations);
router.get("/:userId", authMiddleware, getConversation);
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
