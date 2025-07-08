const express = require('express');
const Booking = require('../models/Booking');
const Showtime = require('../models/Showtime');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('showtime')
      .populate({
        path: 'showtime',
        populate: [
          { path: 'movie', select: 'title poster' },
          { path: 'theatre', select: 'name location' }
        ]
      })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('showtime')
      .populate({
        path: 'showtime',
        populate: [
          { path: 'movie', select: 'title poster synopsis' },
          { path: 'theatre', select: 'name location' }
        ]
      });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { showtimeId, selectedSeats } = req.body;
    
    // Get showtime details
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    
    // Check if seats are available
    for (const seat of selectedSeats) {
      const [row, col] = seat.split('');
      const rowIndex = row.charCodeAt(0) - 65;
      const colIndex = parseInt(col) - 1;
      if (showtime.seatLayout[rowIndex][colIndex].isBooked) {
        return res.status(400).json({ message: `Seat ${seat} is already booked` });
      }
    }
    
    // Calculate total amount
    const totalAmount = selectedSeats.length * showtime.price;
    
    // Create booking
    const booking = new Booking({
      user: req.user.userId,
      showtime: showtimeId,
      selectedSeats,
      totalAmount
    });
    await booking.save();
    
    // Update seat status
    for (const seat of selectedSeats) {
      const [row, col] = seat.split('');
      const rowIndex = row.charCodeAt(0) - 65;
      const colIndex = parseInt(col) - 1;
      showtime.seatLayout[rowIndex][colIndex].isBooked = true;
    }
    await showtime.save();
    
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update seat status
    const showtime = await Showtime.findById(booking.showtime);
    for (const seat of booking.selectedSeats) {
      const [row, col] = seat.split('');
      const rowIndex = row.charCodeAt(0) - 65;
      const colIndex = parseInt(col) - 1;
      showtime.seatLayout[rowIndex][colIndex].isBooked = false;
    }
    await showtime.save();
    
    // Delete booking
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 