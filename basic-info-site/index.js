const path = require("path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
