const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

module.exports = mongoose.model('Category', categorySchema, 'categories');
