const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { updateUserMembershipStatus } = require("../db/queries");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// Join club page
router.get("/join", isAuthenticated, (req, res) => {
  res.render("join-club", { title: "Join the Club", errors: [] });
});

// Join club POST
router.post(
  "/join",
  isAuthenticated,
  [body("passcode").trim().notEmpty().withMessage("Passcode is required")],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("join-club", {
        title: "Join the Club",
        errors: errors.array(),
      });
    }

    try {
      const { passcode } = req.body;

      if (passcode === process.env.MEMBER_PASSCODE) {
        await updateUserMembershipStatus(req.user.id, true);
        // Update the session user object
        req.user.is_member = true;
        res.redirect("/");
      } else {
        res.render("join-club", {
          title: "Join the Club",
          errors: [{ msg: "Incorrect passcode" }],
        });
      }
    } catch (error) {
      console.error(error);
      res.render("join-club", {
        title: "Join the Club",
        errors: [{ msg: "Server error" }],
      });
    }
  },
);

module.exports = router;
