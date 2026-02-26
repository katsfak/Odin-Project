import express from "express";
import {
    createHighScore,
    getAllHighScores,
    getHighScoresByImage,
} from "../controllers/highScoreController.js";

const router = express.Router();

router.get("/", getAllHighScores);
router.get("/image/:imageId", getHighScoresByImage);
router.post("/", createHighScore);

export default router;
