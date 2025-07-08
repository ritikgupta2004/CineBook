import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Bookings from './pages/Bookings';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import MovieManagement from './pages/admin/MovieManagement';
import TheatreManagement from './pages/admin/TheatreManagement';
import ShowtimeManagement from './pages/admin/ShowtimeManagement';
import UserManagement from './pages/admin/UserManagement';
import UpcomingMovies from './pages/UpcomingMovies';
import BookingSummaryPage from './pages/BookingSummaryPage';
import SearchWindowPage from './pages/SearchWindowPage';
// import UserManagement when created

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/movies" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <MovieManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/theatres" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <TheatreManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/showtimes" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ShowtimeManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="/upcoming" element={<UpcomingMovies />} />
          <Route path="/booking-summary" element={<BookingSummaryPage />} />
          <Route path="/search" element={<SearchWindowPage />} />
          {/* Add UserManagement route here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
