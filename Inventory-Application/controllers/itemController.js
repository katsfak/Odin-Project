const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

function itemValidationRules() {
  return [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters."),
    body("description")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description must be 500 characters or less."),
    body("sku")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("SKU must be between 3 and 50 characters."),
    body("priceCents")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Price (cents) must be a non-negative integer."),
    body("stockQuantity")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Stock quantity must be a non-negative integer."),
    body("categoryId")
      .trim()
      .isInt({ min: 1 })
      .withMessage("Please select a valid category."),
  ];
}

function adminPasswordValidationRule() {
  return body("adminPassword")
    .trim()
    .custom((value) => value === process.env.ADMIN_SECRET_PASSWORD)
    .withMessage("Invalid admin password.");
}

async function getItemList(req, res, next) {
  try {
    const items = await db.getAllItems();
    res.render("items/list", {
      title: "Items",
      items,
    });
  } catch (error) {
    next(error);
  }
}

async function getItemDetail(req, res, next) {
  try {
    const item = await db.getItemById(req.params.id);
    if (!item) {
      return res.status(404).render("404", { title: "Item Not Found" });
    }

    res.render("items/detail", {
      title: item.name,
      item,
      errors: [],
      formData: {},
    });
  } catch (error) {
    next(error);
  }
}

async function getItemCreateForm(req, res, next) {
  try {
    const categories = await db.getAllCategories();
    res.render("items/form", {
      title: "Create Item",
      heading: "Create Item",
      action: "/items/new",
      item: {},
      categories,
      errors: [],
      requiresAdminPassword: false,
    });
  } catch (error) {
    next(error);
  }
}

const postItemCreate = [
  ...itemValidationRules(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const item = {
      name: req.body.name,
      description: req.body.description,
      sku: req.body.sku,
      priceCents: req.body.priceCents,
      stockQuantity: req.body.stockQuantity,
      categoryId: req.body.categoryId,
    };

    if (!errors.isEmpty()) {
      try {
        const categories = await db.getAllCategories();
        return res.status(400).render("items/form", {
          title: "Create Item",
          heading: "Create Item",
          action: "/items/new",
          item,
          categories,
          errors: errors.array(),
          requiresAdminPassword: false,
        });
      } catch (innerError) {
        return next(innerError);
      }
    }

    try {
      await db.createItem(item);
      res.redirect("/items");
    } catch (error) {
      next(error);
    }
  },
];

async function getItemUpdateForm(req, res, next) {
  try {
    const [item, categories] = await Promise.all([
      db.getItemById(req.params.id),
      db.getAllCategories(),
    ]);

    if (!item) {
      return res.status(404).render("404", { title: "Item Not Found" });
    }

    res.render("items/form", {
      title: `Update ${item.name}`,
      heading: `Update ${item.name}`,
      action: `/items/${item.id}/edit?_method=PUT`,
      item,
      categories,
      errors: [],
      requiresAdminPassword: true,
    });
  } catch (error) {
    next(error);
  }
}

const putItemUpdate = [
  ...itemValidationRules(),
  adminPasswordValidationRule(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const item = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      sku: req.body.sku,
      priceCents: req.body.priceCents,
      stockQuantity: req.body.stockQuantity,
      categoryId: req.body.categoryId,
    };

    if (!errors.isEmpty()) {
      try {
        const categories = await db.getAllCategories();
        return res.status(400).render("items/form", {
          title: `Update ${item.name || "Item"}`,
          heading: `Update ${item.name || "Item"}`,
          action: `/items/${item.id}/edit?_method=PUT`,
          item,
          categories,
          errors: errors.array(),
          requiresAdminPassword: true,
        });
      } catch (innerError) {
        return next(innerError);
      }
    }

    try {
      await db.updateItem(item.id, item);
      res.redirect(`/items/${item.id}`);
    } catch (error) {
      next(error);
    }
  },
];

const deleteItemById = [
  adminPasswordValidationRule(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const itemId = req.params.id;

    if (!errors.isEmpty()) {
      const item = await db.getItemById(itemId);
      if (!item) {
        return res.status(404).render("404", { title: "Item Not Found" });
      }

      return res.status(400).render("items/detail", {
        title: item.name,
        item,
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      await db.deleteItem(itemId);
      res.redirect("/items");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getItemList,
  getItemDetail,
  getItemCreateForm,
  postItemCreate,
  getItemUpdateForm,
  putItemUpdate,
  deleteItemById,
};
