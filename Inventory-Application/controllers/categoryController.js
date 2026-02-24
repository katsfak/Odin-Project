const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

function categoryValidationRules() {
  return [
    body("name")
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("Name must be between 2 and 80 characters."),
    body("description")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description must be 500 characters or less."),
  ];
}

function adminPasswordValidationRule() {
  return body("adminPassword")
    .trim()
    .custom((value) => value === process.env.ADMIN_SECRET_PASSWORD)
    .withMessage("Invalid admin password.");
}

async function getCategoryList(req, res, next) {
  try {
    const categories = await db.getAllCategories();
    res.render("categories/list", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
}

async function getCategoryDetail(req, res, next) {
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).render("404", { title: "Category Not Found" });
    }

    res.render("categories/detail", {
      title: category.name,
      category,
      errors: [],
      formData: {},
    });
  } catch (error) {
    next(error);
  }
}

function getCategoryCreateForm(req, res) {
  res.render("categories/form", {
    title: "Create Category",
    heading: "Create Category",
    action: "/categories/new",
    category: {},
    errors: [],
    requiresAdminPassword: false,
  });
}

const postCategoryCreate = [
  ...categoryValidationRules(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const category = {
      name: req.body.name,
      description: req.body.description,
    };

    if (!errors.isEmpty()) {
      return res.status(400).render("categories/form", {
        title: "Create Category",
        heading: "Create Category",
        action: "/categories/new",
        category,
        errors: errors.array(),
        requiresAdminPassword: false,
      });
    }

    try {
      await db.createCategory(category);
      res.redirect("/categories");
    } catch (error) {
      next(error);
    }
  },
];

async function getCategoryUpdateForm(req, res, next) {
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).render("404", { title: "Category Not Found" });
    }

    res.render("categories/form", {
      title: `Update ${category.name}`,
      heading: `Update ${category.name}`,
      action: `/categories/${category.id}/edit?_method=PUT`,
      category,
      errors: [],
      requiresAdminPassword: true,
    });
  } catch (error) {
    next(error);
  }
}

const putCategoryUpdate = [
  ...categoryValidationRules(),
  adminPasswordValidationRule(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const category = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    };

    if (!errors.isEmpty()) {
      return res.status(400).render("categories/form", {
        title: `Update ${category.name || "Category"}`,
        heading: `Update ${category.name || "Category"}`,
        action: `/categories/${category.id}/edit?_method=PUT`,
        category,
        errors: errors.array(),
        requiresAdminPassword: true,
      });
    }

    try {
      await db.updateCategory(category.id, category);
      res.redirect(`/categories/${category.id}`);
    } catch (error) {
      next(error);
    }
  },
];

const deleteCategoryById = [
  adminPasswordValidationRule(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;

    if (!errors.isEmpty()) {
      const category = await db.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).render("404", { title: "Category Not Found" });
      }

      return res.status(400).render("categories/detail", {
        title: category.name,
        category,
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      await db.deleteCategory(categoryId);
      res.redirect("/categories");
    } catch (error) {
      if (error.code === "23503") {
        try {
          const category = await db.getCategoryById(categoryId);
          if (!category) {
            return res
              .status(404)
              .render("404", { title: "Category Not Found" });
          }

          return res.status(409).render("categories/detail", {
            title: category.name,
            category,
            errors: [
              {
                msg: "Cannot delete this category because it still contains items. Remove or move those items first.",
              },
            ],
            formData: req.body,
          });
        } catch (innerError) {
          return next(innerError);
        }
      }

      next(error);
    }
  },
];

module.exports = {
  getCategoryList,
  getCategoryDetail,
  getCategoryCreateForm,
  postCategoryCreate,
  getCategoryUpdateForm,
  putCategoryUpdate,
  deleteCategoryById,
};
