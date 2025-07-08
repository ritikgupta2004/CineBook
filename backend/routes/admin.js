const express = require('express');
const User = require('../models/User');
const Movie = require('../models/Movie');
const Theatre = require('../models/Theatre');
const Showtime = require('../models/Showtime');
const Booking = require('../models/Booking');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Apply admin middleware to all routes
router.use(authenticateToken, authorizeRoles('admin'));

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Count total users
    const totalUsers = await User.countDocuments();
    
    // Count total movies
    const totalMovies = await Movie.countDocuments();
    
    // Count total theatres
    const totalTheatres = await Theatre.countDocuments();
    
    // Count total bookings
    const totalBookings = await Booking.countDocuments();
    
    // Calculate total revenue
    const bookings = await Booking.find();
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    
    // Get recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate({
        path: 'showtime',
        populate: [
          { path: 'movie', select: 'title' },
          { path: 'theatre', select: 'name' }
        ]
      })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get top movies by bookings
    const movieStats = await Booking.aggregate([
      {
        $lookup: {
          from: 'showtimes',
          localField: 'showtime',
          foreignField: '_id',
          as: 'showtimeData'
        }
      },
      {
        $unwind: '$showtimeData'
      },
      {
        $lookup: {
          from: 'movies',
          localField: 'showtimeData.movie',
          foreignField: '_id',
          as: 'movieData'
        }
      },
      {
        $unwind: '$movieData'
      },
      {
        $group: {
          _id: '$movieData._id',
          title: { $first: '$movieData.title' },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { totalBookings: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    res.json({
      stats: {
        totalUsers,
        totalMovies,
        totalTheatres,
        totalBookings,
        totalRevenue
      },
      recentBookings,
      topMovies: movieStats
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking analytics
router.get('/analytics/bookings', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    let startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }
    
    const bookings = await Booking.find({
      createdAt: { $gte: startDate }
    }).populate({
      path: 'showtime',
      populate: [
        { path: 'movie', select: 'title' },
        { path: 'theatre', select: 'name location' }
      ]
    });
    
    // Group by date
    const bookingsByDate = {};
    bookings.forEach(booking => {
      const date = booking.createdAt.toISOString().split('T')[0];
      if (!bookingsByDate[date]) {
        bookingsByDate[date] = { count: 0, revenue: 0 };
      }
      bookingsByDate[date].count++;
      bookingsByDate[date].revenue += booking.totalAmount;
    });
    
    res.json({
      period,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
      bookingsByDate
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie performance
router.get('/analytics/movies', async (req, res) => {
  try {
    const moviePerformance = await Booking.aggregate([
      {
        $lookup: {
          from: 'showtimes',
          localField: 'showtime',
          foreignField: '_id',
          as: 'showtimeData'
        }
      },
      {
        $unwind: '$showtimeData'
      },
      {
        $lookup: {
          from: 'movies',
          localField: 'showtimeData.movie',
          foreignField: '_id',
          as: 'movieData'
        }
      },
      {
        $unwind: '$movieData'
      },
      {
        $group: {
          _id: '$movieData._id',
          title: { $first: '$movieData.title' },
          genre: { $first: '$movieData.genre' },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          avgTicketPrice: { $avg: '$totalAmount' }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      }
    ]);
    
    res.json(moviePerformance);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 