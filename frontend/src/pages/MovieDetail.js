import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails();
    fetchShowtimes();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    } catch (err) {
      setError('Failed to fetch movie details');
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get(`/api/showtimes?movie=${id}`);
      setShowtimes(response.data);
    } catch (err) {
      setError('Failed to fetch showtimes');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (rowIndex, colIndex, seatNumber) => {
    if (!selectedShowtime) return;
    
    const seat = selectedShowtime.seatLayout[rowIndex][colIndex];
    if (seat.isBooked) return;

    setSelectedSeats(prev => {
      const isSelected = prev.includes(seatNumber);
      if (isSelected) {
        return prev.filter(seat => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const response = await axios.post('/api/bookings', {
        showtimeId: selectedShowtime._id,
        selectedSeats
      });
      
      alert('Booking successful!');
      navigate('/bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  if (error || !movie) {
    return <div className="container mx-auto py-8 text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Movie Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.title}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <div className="space-y-2 mb-4">
              <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
              <p><strong>Language:</strong> {movie.language.join(', ')}</p>
              <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  movie.status === 'now-showing' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {movie.status === 'now-showing' ? 'Now Showing' : 'Upcoming'}
                </span>
              </p>
            </div>
            {movie.synopsis && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-700">{movie.synopsis}</p>
              </div>
            )}
            {movie.trailerUrl && (
              <div className="mt-4">
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Showtimes */}
      {movie.status === 'now-showing' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
          {showtimes.length === 0 ? (
            <p className="text-gray-500">No showtimes available for this movie.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showtimes.map((showtime) => (
                <div
                  key={showtime._id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedShowtime?._id === showtime._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedShowtime(showtime)}
                >
                  <h3 className="font-semibold">{showtime.theatre.name}</h3>
                  <p className="text-gray-600">{showtime.theatre.location}</p>
                  <p className="text-gray-600">Screen: {showtime.screen}</p>
                  <p className="text-lg font-bold">
                    {new Date(showtime.time).toLocaleString()}
                  </p>
                  <p className="text-green-600 font-semibold">₹{showtime.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seat Selection */}
      {selectedShowtime && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Select Seats</h2>
          <div className="mb-4">
            <p><strong>Theatre:</strong> {selectedShowtime.theatre.name}</p>
            <p><strong>Time:</strong> {new Date(selectedShowtime.time).toLocaleString()}</p>
            <p><strong>Price per seat:</strong> ₹{selectedShowtime.price}</p>
            <p><strong>Selected seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
            <p><strong>Total:</strong> ₹{selectedSeats.length * selectedShowtime.price}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-64 h-2 bg-gray-300 rounded"></div>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${selectedShowtime.seatLayout[0]?.length || 10}, 1fr)` }}>
              {selectedShowtime.seatLayout.map((row, rowIndex) =>
                row.map((seat, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-8 h-8 text-xs rounded ${
                      seat.isBooked
                        ? 'bg-red-500 text-white cursor-not-allowed'
                        : selectedSeats.includes(seat.seatNumber)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handleSeatClick(rowIndex, colIndex, seat.seatNumber)}
                    disabled={seat.isBooked}
                  >
                    {seat.seatNumber}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              Book Seats ({selectedSeats.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail; 