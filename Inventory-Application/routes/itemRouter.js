const { Router } = require("express");
const itemController = require("../controllers/itemController");

const router = Router();

router.get("/", itemController.getItemList);
router.get("/new", itemController.getItemCreateForm);
router.post("/new", itemController.postItemCreate);
router.get("/:id", itemController.getItemDetail);
router.get("/:id/edit", itemController.getItemUpdateForm);
router.put("/:id/edit", itemController.putItemUpdate);
router.delete("/:id", itemController.deleteItemById);

module.exports = router;
