const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const prisma = require("../db/prisma");

function renderWithErrors(res, view, title, errors, form) {
  return res.status(400).render(view, {
    title,
    errors: errors.array(),
    form,
  });
}

async function showRegister(req, res) {
  res.render("auth/register", { title: "Register", errors: [], form: {} });
}

async function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderWithErrors(res, "auth/register", "Register", errors, req.body);
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existing) {
      return res.status(400).render("auth/register", {
        title: "Register",
        errors: [{ msg: "Email already registered" }],
        form: req.body,
      });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashed,
      },
    });

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome! Your account is ready.");
      return res.redirect("/folders");
    });
  } catch (err) {
    return next(err);
  }
}

async function showLogin(req, res) {
  res.render("auth/login", { title: "Login", errors: [], form: {} });
}

function loginSuccess(req, res) {
  req.flash("success", "Signed in successfully.");
  res.redirect("/folders");
}

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Signed out successfully.");
    return res.redirect("/login");
  });
}

module.exports = {
  showRegister,
  register,
  showLogin,
  loginSuccess,
  logout,
};
