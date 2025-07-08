import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: [],
    language: [],
    cast: [],
    trailerUrl: '',
    releaseDate: '',
    synopsis: '',
    poster: '',
    status: 'upcoming'
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    const array = value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [name]: array }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await axios.put(`/api/movies/${editingMovie._id}`, formData);
        alert('Movie updated successfully');
      } else {
        await axios.post('/api/movies', formData);
        alert('Movie added successfully');
      }
      setShowForm(false);
      setEditingMovie(null);
      resetForm();
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      genre: movie.genre,
      language: movie.language,
      cast: movie.cast,
      trailerUrl: movie.trailerUrl || '',
      releaseDate: movie.releaseDate.split('T')[0],
      synopsis: movie.synopsis || '',
      poster: movie.poster || '',
      status: movie.status
    });
    setShowForm(true);
  };

  const handleDelete = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }
    try {
      await axios.delete(`/api/movies/${movieId}`);
      alert('Movie deleted successfully');
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete movie');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genre: [],
      language: [],
      cast: [],
      trailerUrl: '',
      releaseDate: '',
      synopsis: '',
      poster: '',
      status: 'upcoming'
    });
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Movie Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingMovie(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Movie
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Movie Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingMovie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="now-showing">Now Showing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre (comma-separated)</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre.join(', ')}
                  onChange={handleArrayInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Action, Drama, Comedy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language (comma-separated)</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language.join(', ')}
                  onChange={handleArrayInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="English, Hindi"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cast (comma-separated)</label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast.join(', ')}
                  onChange={handleArrayInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Actor 1, Actor 2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poster URL</label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trailer URL</label>
                <input
                  type="url"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Synopsis</label>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleInputChange}
                rows="4"
                className="w-full border rounded px-3 py-2"
                placeholder="Movie synopsis..."
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingMovie ? 'Update Movie' : 'Add Movie'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMovie(null);
                  resetForm();
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Movies List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poster</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={movie.poster || 'https://via.placeholder.com/50x75?text=No+Poster'}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movie.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movie.genre.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      movie.status === 'now-showing' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {movie.status === 'now-showing' ? 'Now Showing' : 'Upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieManagement; 