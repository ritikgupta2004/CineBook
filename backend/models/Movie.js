const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  language: { type: [String], required: true },
  cast: { type: [String], required: true },
  trailerUrl: { type: String },
  releaseDate: { type: Date, required: true },
  synopsis: { type: String },
  poster: { type: String }, // URL or file path
  status: { type: String, enum: ['now-showing', 'upcoming'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema); 