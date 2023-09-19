const Category = require("../models/category");
const Movie = require("../models/movie");

// get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).exec();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all movies that belong to a category
exports.readCategory = async (req, res) => {
  try {
    const [category, moviesInCategory] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Movie.find({ category: req.params.id }).sort({ name: 1 }).exec(),
    ]);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      movies: moviesInCategory,
      category: category.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
