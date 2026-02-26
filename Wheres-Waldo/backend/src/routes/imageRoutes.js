import express from "express";
import {
    createImage,
    deleteImage,
    getAllImages,
    getImageById,
} from "../controllers/imageController.js";

const router = express.Router();

router.get("/", getAllImages);
router.get("/:id", getImageById);
router.post("/", createImage);
router.delete("/:id", deleteImage);

export default router;
