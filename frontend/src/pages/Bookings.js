import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await axios.put(`/api/bookings/${bookingId}/cancel`);
      alert('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const amount = 500; // in INR

  const handlePayment = async (amount) => {
    const { data: order } = await axios.post("/api/payment/create-order", { amount });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // or your actual key
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "CineBook",
      description: "Movie Ticket Booking",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "user@example.com",
      },
      theme: { color: "#f84464" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading your bookings...</div>
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
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">You haven't made any bookings yet.</p>
          <a
            href="/movies"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Movies
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <img
                    src={booking.showtime.movie.poster || 'https://via.placeholder.com/150x200?text=No+Poster'}
                    alt={booking.showtime.movie.title}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-2">{booking.showtime.movie.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p><strong>Theatre:</strong> {booking.showtime.theatre.name}</p>
                    <p><strong>Location:</strong> {booking.showtime.theatre.location}</p>
                    <p><strong>Screen:</strong> {booking.showtime.screen}</p>
                    <p><strong>Showtime:</strong> {new Date(booking.showtime.time).toLocaleString()}</p>
                    <p><strong>Seats:</strong> {booking.selectedSeats.join(', ')}</p>
                    <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                    <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${
                        booking.paymentStatus === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => handlePayment(amount)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 