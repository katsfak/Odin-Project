const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

router.get("/", categoryController.getCategoryList);
router.get("/new", categoryController.getCategoryCreateForm);
router.post("/new", categoryController.postCategoryCreate);
router.get("/:id", categoryController.getCategoryDetail);
router.get("/:id/edit", categoryController.getCategoryUpdateForm);
router.put("/:id/edit", categoryController.putCategoryUpdate);
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
