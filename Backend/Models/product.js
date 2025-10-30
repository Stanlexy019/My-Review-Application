const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: { type: String, default: '' },
  long: { type: String, default: '' },
  price: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', ProductSchema);
