const Category = require("../models/category");

// get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({name: 1}).exec();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
