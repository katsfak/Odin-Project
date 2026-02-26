const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folders");
  }

  return res.render("index", { title: "File Uploader" });
});

module.exports = router;
