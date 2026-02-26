import express from "express";
import { validateClick } from "../controllers/validationController.js";

const router = express.Router();

// POST /api/validate/click
router.post("/click", validateClick);

export default router;
