const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategory);
router.get("/:id", categoryController.readCategory);
//router.put("/:id", updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
