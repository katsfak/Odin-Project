const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/items", itemRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", {
    title: "Error",
    message: err.message || "Something went wrong.",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Inventory app running on http://localhost:${port}`);
});
