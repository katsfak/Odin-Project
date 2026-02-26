const express = require("express");
const passport = require("passport");

const authController = require("../controllers/authController");
const { ensureGuest } = require("../middleware/auth");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validators");

const router = express.Router();

router.get("/register", ensureGuest, authController.showRegister);
router.post(
  "/register",
  ensureGuest,
  registerValidator,
  authController.register,
);

router.get("/login", ensureGuest, authController.showLogin);
router.post(
  "/login",
  ensureGuest,
  loginValidator,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  authController.loginSuccess,
);

router.post("/logout", authController.logout);

module.exports = router;
