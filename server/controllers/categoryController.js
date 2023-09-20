const Category = require("../models/category");
const Movie = require("../models/movie");

// get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).exec();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      movies: moviesInCategory,
      category: category.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).exec();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const moviesInCategory = await Movie.find({
      category: req.params.id,
    }).exec();

    // if there is no movies in this category, delete category
    if (moviesInCategory.length === 0) {
      await Category.findByIdAndRemove(req.params.id);
      return res.status(200).json({ message: "Category has been deleted" });
    } else {
      return res
        .status(400)
        .json({ message: "Category still has movies. Cannot delete" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
