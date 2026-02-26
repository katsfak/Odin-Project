const { Router } = require("express");
const authRoutes = require("./auth");
const postRoutes = require("./posts");

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;
