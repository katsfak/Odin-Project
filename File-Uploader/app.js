require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const helmet = require("helmet");
const methodOverride = require("method-override");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const engine = require("ejs-mate");

const prisma = require("./src/db/prisma");
const configurePassport = require("./src/config/passport");

const indexRoutes = require("./src/routes/indexRoutes");
const authRoutes = require("./src/routes/authRoutes");
const folderRoutes = require("./src/routes/folderRoutes");
const fileRoutes = require("./src/routes/fileRoutes");
const shareRoutes = require("./src/routes/shareRoutes");

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: process.env.SESSION_SECRET || "unsafe_dev_secret",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 1000 * 60 * 2,
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use(flash());

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.shareLink = req.flash("shareLink");
  next();
});

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/folders", folderRoutes);
app.use("/files", fileRoutes);
app.use("/share", shareRoutes);

app.use((err, req, res, next) => {
  if (
    err &&
    (err.code === "LIMIT_FILE_SIZE" || err.message === "Unsupported file type")
  ) {
    req.flash(
      "error",
      err.code === "LIMIT_FILE_SIZE" ? "File is too large." : err.message,
    );
    const backUrl = req.get("Referrer") || "/folders";
    return res.redirect(backUrl);
  }

  return next(err);
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500", { title: "Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
