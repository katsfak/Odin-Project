const db = require("../db/queries");

async function getHomePage(req, res, next) {
  try {
    const stats = await db.getDashboardStats();
    res.render("index", {
      title: "Inventory App",
      stats,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHomePage,
};
