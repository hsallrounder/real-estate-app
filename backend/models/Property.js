const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  place: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  nearby: [String],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Property', propertySchema);
