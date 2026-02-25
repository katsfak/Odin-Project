const express = require("express");
const router = express.Router();
const { getAllMessages } = require("../db/queries");

router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.render("index", {
      title: "Members Only",
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error });
  }
});

module.exports = router;
