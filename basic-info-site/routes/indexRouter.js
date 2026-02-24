const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {
    title: "New Message",
  });
});

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

indexRouter.get("/messages/:messageId", (req, res) => {
  const messageId = Number.parseInt(req.params.messageId, 10);
  const message = messages[messageId];

  if (!message) {
    return res.status(404).render("404", { title: "404 - Not Found" });
  }

  return res.render("message", {
    title: "Message Details",
    message,
  });
});

module.exports = indexRouter;
