const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  numberInStock: { type: Number, required: true },
});

movieSchema.virtual("url").get(function () {
  return `/movies/${this._id}`;
});

// Export model
module.exports = mongoose.model("Movie", movieSchema);
