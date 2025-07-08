import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    status: ''
  });

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.genre) params.append('genre', filters.genre);
      if (filters.language) params.append('language', filters.language);
      if (filters.status) params.append('status', filters.status);
      
      const response = await axios.get(`/api/movies?${params}`);
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="now-showing">Now Showing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </select>
          
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {movie.genre.join(', ')} • {movie.language.join(', ')}
              </p>
              <p className="text-gray-500 text-xs mb-3">
                Release: {new Date(movie.releaseDate).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  movie.status === 'now-showing' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {movie.status === 'now-showing' ? 'Now Showing' : 'Upcoming'}
                </span>
                <Link
                  to={`/movies/${movie._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No movies found matching your filters.
        </div>
      )}
    </div>
  );
};

export default Movies; 