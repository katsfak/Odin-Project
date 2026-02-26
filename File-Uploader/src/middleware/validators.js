const { body } = require("express-validator");

const registerValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];

const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const folderValidator = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Folder name must be 1-50 characters"),
];

const shareValidator = [
  body("duration")
    .trim()
    .matches(/^\d+[dhm]$/i)
    .withMessage("Duration must be like 1d or 10d"),
];

module.exports = {
  registerValidator,
  loginValidator,
  folderValidator,
  shareValidator,
};
