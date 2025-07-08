const express = require('express');
const Movie = require('../models/Movie');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all movies (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { genre, language, status } = req.query;
    let filter = {};
    if (genre) filter.genre = genre;
    if (language) filter.language = language;
    if (status) filter.status = status;
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add a movie
router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a movie
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete a movie
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 