const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const propertySchema = new mongoose.Schema({
  place: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  nearby: [String],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  likedBy: [String],
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Assuming the token contains userId and role
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
}


router.post('/:propertyId/like', authenticateUser, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const userId = req.user.userId; // Assume req.user is set by authenticateUser middleware

    const user = await User.findById(userId);
    if (user.role !== 'buyer') {
      return res.status(403).send('Only buyers can like properties');
    }

    if (!user.liked_properties.includes(propertyId)) {
      user.liked_properties.push(propertyId);
      await user.save();
    }

    const property = await Property.findByIdAndUpdate(propertyId, { $inc: { likes: 1 } }, { new: true });
    res.status(200).send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/:propertyId/rent', authenticateUser, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const userId = req.user.userId; // Assume req.user is set by authenticateUser middleware

    const user = await User.findById(userId);
    if (user.role !== 'seller') {
      return res.status(403).send('Only sellers can add rental properties');
    }

    if (!user.rental_properties.includes(propertyId)) {
      user.rental_properties.push(propertyId);
      await user.save();
    }

    res.status(200).send('Property added to rental list');
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = mongoose.model('Property', propertySchema);
