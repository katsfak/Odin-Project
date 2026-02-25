const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { createMessage, deleteMessage } = require("../db/queries");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  res
    .status(403)
    .render("error", { error: { status: 403, message: "Forbidden" } });
};

// New message page
router.get("/new", isAuthenticated, (req, res) => {
  res.render("new-message", { title: "Create New Message", errors: [] });
});

// Create message POST
router.post(
  "/new",
  isAuthenticated,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 255 })
      .withMessage("Title must be between 3 and 255 characters")
      .escape(),
    body("text")
      .trim()
      .notEmpty()
      .withMessage("Message text is required")
      .isLength({ min: 1, max: 5000 })
      .withMessage("Message must be between 1 and 5000 characters")
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-message", {
        title: "Create New Message",
        errors: errors.array(),
      });
    }

    try {
      const { title, text } = req.body;
      await createMessage(title, text, req.user.id);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.render("new-message", {
        title: "Create New Message",
        errors: [{ msg: "Error creating message" }],
      });
    }
  },
);

// Delete message
router.post("/delete/:id", isAdmin, async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error });
  }
});

module.exports = router;
