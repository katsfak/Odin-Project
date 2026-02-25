const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const passport = require("./config/passport");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const memberRouter = require("./routes/member");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/member", memberRouter);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
