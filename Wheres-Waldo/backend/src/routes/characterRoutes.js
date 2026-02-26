import express from "express";
import {
    createCharacter,
    deleteCharacter,
    getCharacterById,
    getCharactersByImage,
    updateCharacter,
} from "../controllers/characterController.js";

const router = express.Router();

router.get("/image/:imageId", getCharactersByImage);
router.post("/", createCharacter);
router.get("/:id", getCharacterById);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
