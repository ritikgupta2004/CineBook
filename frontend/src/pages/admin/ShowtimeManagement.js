import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';

const ShowtimeManagement = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [formData, setFormData] = useState({
    movie: '',
    theatre: '',
    screen: '',
    time: '',
    price: 200,
    rows: 5,
    cols: 10
  });

  useEffect(() => {
    fetchShowtimes();
    fetchMovies();
    fetchTheatres();
  }, []);

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/showtimes');
      setShowtimes(response.data);
    } catch (err) {
      setError('Failed to fetch showtimes');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    } catch (err) {}
  };

  const fetchTheatres = async () => {
    try {
      const response = await axios.get('/api/theatres');
      setTheatres(response.data);
    } catch (err) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShowtime) {
        await axios.put(`/api/showtimes/${editingShowtime._id}`, formData);
        alert('Showtime updated successfully');
      } else {
        await axios.post('/api/showtimes', formData);
        alert('Showtime added successfully');
      }
      setShowForm(false);
      setEditingShowtime(null);
      resetForm();
      fetchShowtimes();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (showtime) => {
    setEditingShowtime(showtime);
    setFormData({
      movie: showtime.movie._id,
      theatre: showtime.theatre._id,
      screen: showtime.screen,
      time: showtime.time.split('.')[0],
      price: showtime.price,
      rows: showtime.seatLayout.length,
      cols: showtime.seatLayout[0]?.length || 10
    });
    setShowForm(true);
  };

  const handleDelete = async (showtimeId) => {
    if (!window.confirm('Are you sure you want to delete this showtime?')) {
      return;
    }
    try {
      await axios.delete(`/api/showtimes/${showtimeId}`);
      alert('Showtime deleted successfully');
      fetchShowtimes();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete showtime');
    }
  };

  const resetForm = () => {
    setFormData({
      movie: '',
      theatre: '',
      screen: '',
      time: '',
      price: 200,
      rows: 5,
      cols: 10
    });
  };

  const getScreensForTheatre = (theatreId) => {
    const theatre = theatres.find(t => t._id === theatreId);
    return theatre ? theatre.screens : [];
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Showtime Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingShowtime(null);
            resetForm();
          }}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Add New Showtime
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Showtime Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingShowtime ? 'Edit Showtime' : 'Add New Showtime'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movie</label>
                <select
                  name="movie"
                  value={formData.movie}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Movie</option>
                  {movies.map(movie => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theatre</label>
                <select
                  name="theatre"
                  value={formData.theatre}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Theatre</option>
                  {theatres.map(theatre => (
                    <option key={theatre._id} value={theatre._id}>{theatre.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Screen</label>
                <select
                  name="screen"
                  value={formData.screen}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  disabled={!formData.theatre}
                >
                  <option value="">Select Screen</option>
                  {getScreensForTheatre(formData.theatre).map((screen, idx) => (
                    <option key={idx} value={screen.name}>{screen.name} ({screen.totalSeats} seats)</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Seat</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={formData.rows}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  min={1}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                <input
                  type="number"
                  name="cols"
                  value={formData.cols}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  min={1}
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                {editingShowtime ? 'Update Showtime' : 'Add Showtime'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingShowtime(null);
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

      {/* Showtimes List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theatre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {showtimes.map((showtime) => (
                <tr key={showtime._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {showtime.movie.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.theatre.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.screen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(showtime.time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{showtime.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.seatLayout.length * (showtime.seatLayout[0]?.length || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(showtime)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(showtime._id)}
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

export default ShowtimeManagement; 