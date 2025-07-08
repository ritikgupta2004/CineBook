const express = require('express');
const Showtime = require('../models/Showtime');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all showtimes (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { movie, theatre, date } = req.query;
    let filter = {};
    if (movie) filter.movie = movie;
    if (theatre) filter.theatre = theatre;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.time = { $gte: startDate, $lt: endDate };
    }
    const showtimes = await Showtime.find(filter)
      .populate('movie', 'title poster')
      .populate('theatre', 'name location');
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get showtime by ID
router.get('/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate('movie', 'title poster synopsis')
      .populate('theatre', 'name location');
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add a showtime
router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { rows, cols } = req.body;
    // Create seat layout
    const seatLayout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          seatNumber: `${String.fromCharCode(65 + i)}${j + 1}`,
          isBooked: false
        });
      }
      seatLayout.push(row);
    }
    const showtime = new Showtime({
      ...req.body,
      seatLayout
    });
    await showtime.save();
    res.status(201).json(showtime);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a showtime
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete a showtime
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json({ message: 'Showtime deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 