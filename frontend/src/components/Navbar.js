import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        {/* Left menu */}
        <div className="flex space-x-8">
          <Link to="/upcoming" className="hover:text-red-500">Movies</Link>
          <Link to="/stream" className="hover:text-red-600">Stream</Link>
          <Link to="/events" className="hover:text-red-600">Events</Link>
          <Link to="/plays" className="hover:text-red-600">Plays</Link>
          <Link to="/sports" className="hover:text-red-600">Sports</Link>
          <Link to="/activities" className="hover:text-red-600">Activities</Link>
        </div>
        {/* Right menu */}
        <div className="flex space-x-8">
          <Link to="/list-your-show" className="hover:text-red-600">ListYourShow</Link>
          <Link to="/corporates" className="hover:text-red-600">Corporates</Link>
          <Link to="/offers" className="hover:text-red-600">Offers</Link>
          <Link to="/gift-cards" className="hover:text-red-600">Gift Cards</Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </div>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={() => navigate('/search')}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 