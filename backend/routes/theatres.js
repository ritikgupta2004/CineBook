const express = require('express');
const Theatre = require('../models/Theatre');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all theatres
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    let filter = {};
    if (location) filter.location = location;
    const theatres = await Theatre.find(filter);
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get theatre by ID
router.get('/:id', async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
    res.json(theatre);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add a theatre
router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();
    res.status(201).json(theatre);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a theatre
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
    res.json(theatre);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete a theatre
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.id);
    if (!theatre) return res.status(404).json({ message: 'Theatre not found' });
    res.json({ message: 'Theatre deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 