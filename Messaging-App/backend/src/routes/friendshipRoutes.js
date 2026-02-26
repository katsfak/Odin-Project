import express from "express";
import {
    acceptFriend,
    addFriend,
    getFriends,
    getOnlineFriends,
    getPendingRequests,
    removeFriend,
} from "../controllers/friendshipController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addFriend);
router.get("/", authMiddleware, getFriends);
router.get("/pending", authMiddleware, getPendingRequests);
router.get("/online", authMiddleware, getOnlineFriends);
router.put("/:friendshipId", authMiddleware, acceptFriend);
router.delete("/:friendshipId", authMiddleware, removeFriend);

export default router;
