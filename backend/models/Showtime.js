const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
});

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  screen: { type: String, required: true },
  time: { type: Date, required: true },
  seatLayout: [[seatSchema]], // 2D array for rows and columns
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Showtime', showtimeSchema); 