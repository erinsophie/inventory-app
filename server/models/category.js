const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

categorySchema.virtual("url").get(function () {
  return `/api/categories/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", categorySchema, "categories");
