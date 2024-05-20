const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User = require('../models/User');

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
router.post('/', async (req, res) => {
  try {
    const { place, area, bedrooms, bathrooms } = req.body;
    if (!place || !area || !bedrooms || !bathrooms) {
      return res.status(400).send('Missing required property attributes');
    }

    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Middleware to authenticate user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // Verify token and extract user information
  // Example: const user = jwt.verify(token, JWT_SECRET);
  // Check if user exists and has the required role

  // If authentication successful, proceed to the next middleware
  next();
}

// Get all properties with authentication
router.get('/', authenticateUser, async (req, res) => {
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

// Like a property
router.post('/:propertyId/like', authenticateUser, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    // Find property by ID and update the like count
    // Example: const property = await Property.findByIdAndUpdate(propertyId, { $inc: { likes: 1 } }, { new: true });
    res.status(200).send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Express route for handling interested buyers
router.post('/:propertyId/interest', async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const buyerId = req.body.buyerId;

    // Fetch property and buyer details
    // Example: const property = await Property.findById(propertyId);
    // const buyer = await User.findById(buyerId);

    // Send email notifications to seller and buyer
    // Example: sendEmail(property.sellerId.email, 'Interest Received', `Hi ${property.sellerId.firstName}, you have received interest in your property.`);
    // sendEmail(buyer.email, 'Interest Confirmed', `Hi ${buyer.firstName}, your interest in the property has been confirmed.`);

    res.status(200).send('Interest confirmed');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
