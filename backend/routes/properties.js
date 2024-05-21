const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User = require('../models/User');

// Middleware to authenticate user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
}

// Get all properties with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find().skip(skip).limit(limit);
    res.status(200).send(properties);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new property
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;
    if (!place || !area || !bedrooms || !bathrooms || !nearby) {
      return res.status(400).send('Missing required property attributes');
    }

    // Set sellerId to the email of the authenticated user
    const sellerEmail = req.user.email;
    const property = new Property({ ...req.body, sellerId: sellerEmail });
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Like a property
router.post('/:propertyId/like', authenticateUser, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await Property.findByIdAndUpdate(propertyId, { $inc: { likes: 1 } }, { new: true });
    res.status(200).send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Express route for handling interested buyers
router.post('/:propertyId/interest', authenticateUser, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const buyerId = req.user._id;

    // Fetch property and buyer details
    const property = await Property.findById(propertyId);
    const buyer = await User.findById(buyerId);

    // Send email notifications to seller and buyer
    // Example: sendEmail(property.sellerId, 'Interest Received', `Hi, you have received interest in your property.`);
    // sendEmail(buyer.email, 'Interest Confirmed', `Hi ${buyer.firstName}, your interest in the property has been confirmed.`);

    res.status(200).send('Interest confirmed');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
