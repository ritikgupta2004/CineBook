import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';

const TheatreManagement = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    screens: [{ name: '', totalSeats: 100 }]
  });

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/theatres');
      setTheatres(response.data);
    } catch (err) {
      setError('Failed to fetch theatres');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScreenChange = (index, key, value) => {
    const updatedScreens = [...formData.screens];
    updatedScreens[index][key] = key === 'totalSeats' ? Number(value) : value;
    setFormData(prev => ({ ...prev, screens: updatedScreens }));
  };

  const addScreen = () => {
    setFormData(prev => ({ ...prev, screens: [...prev.screens, { name: '', totalSeats: 100 }] }));
  };

  const removeScreen = (index) => {
    setFormData(prev => ({ ...prev, screens: prev.screens.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTheatre) {
        await axios.put(`/api/theatres/${editingTheatre._id}`, formData);
        alert('Theatre updated successfully');
      } else {
        await axios.post('/api/theatres', formData);
        alert('Theatre added successfully');
      }
      setShowForm(false);
      setEditingTheatre(null);
      resetForm();
      fetchTheatres();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (theatre) => {
    setEditingTheatre(theatre);
    setFormData({
      name: theatre.name,
      location: theatre.location,
      screens: theatre.screens.map(screen => ({ ...screen }))
    });
    setShowForm(true);
  };

  const handleDelete = async (theatreId) => {
    if (!window.confirm('Are you sure you want to delete this theatre?')) {
      return;
    }
    try {
      await axios.delete(`/api/theatres/${theatreId}`);
      alert('Theatre deleted successfully');
      fetchTheatres();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete theatre');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      screens: [{ name: '', totalSeats: 100 }]
    });
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Theatre Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTheatre(null);
            resetForm();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Theatre
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Theatre Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingTheatre ? 'Edit Theatre' : 'Add New Theatre'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Screens</label>
              {formData.screens.map((screen, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Screen Name"
                    value={screen.name}
                    onChange={e => handleScreenChange(idx, 'name', e.target.value)}
                    className="border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Seats"
                    value={screen.totalSeats}
                    min={1}
                    onChange={e => handleScreenChange(idx, 'totalSeats', e.target.value)}
                    className="border rounded px-3 py-2 w-32"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeScreen(idx)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    disabled={formData.screens.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addScreen}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              >
                Add Screen
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingTheatre ? 'Update Theatre' : 'Add Theatre'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTheatre(null);
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

      {/* Theatres List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screens</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {theatres.map((theatre) => (
                <tr key={theatre._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {theatre.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {theatre.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {theatre.screens.map(screen => `${screen.name} (${screen.totalSeats})`).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(theatre)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(theatre._id)}
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

export default TheatreManagement; 