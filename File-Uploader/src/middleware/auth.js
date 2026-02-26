function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Please log in to continue.");
  return res.redirect("/login");
}

function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/folders");
}

module.exports = {
  ensureAuthenticated,
  ensureGuest,
};
