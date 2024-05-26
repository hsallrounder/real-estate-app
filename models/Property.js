const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
  },
  seller_id: {
    type: String,
    required: true
  },
  plotSize: {
    type: Number,
    required: true,
    min: 0, // Minimum plot size allowed (can be adjusted)
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0, // Minimum number of bedrooms allowed (can be adjusted)
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0, // Minimum number of bathrooms allowed (can be adjusted)
  },
  amenities: {
    type: [String],
  },
  // Like and Dislike information
  likes: {
    type: [String], // Array of user IDs who liked
    default: []
  },
  dislikes: {
    type: [String], // Array of user IDs who disliked
    default: []
  },
  // You can add additional property details here
  // (e.g., description, images, location coordinates, etc.)
});

module.exports = mongoose.model('Property', propertySchema);
