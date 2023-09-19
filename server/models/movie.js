const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  numberInStock: { type: Number, required: true },
});

movieSchema.virtual("url").get(function () {
  return `/api/movies/${this._id}`;
});

module.exports = mongoose.model("Movie", movieSchema);
