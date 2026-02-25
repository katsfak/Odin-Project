const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const { createUser } = require("../db/queries");

// Sign up page
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up", errors: [] });
});

// Sign up POST
router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters")
      .escape(),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters")
      .escape(),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Please confirm your password")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    body("isAdmin").optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }

    try {
      const { firstName, lastName, email, password, isAdmin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        isAdmin === "on",
      );
      res.redirect("/auth/login");
    } catch (error) {
      console.error(error);
      res.render("signup", {
        title: "Sign Up",
        errors: [{ msg: "Email already exists or server error" }],
      });
    }
  },
);

// Login page
router.get("/login", (req, res) => {
  res.render("login", { title: "Log In", errors: [] });
});

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  }),
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
