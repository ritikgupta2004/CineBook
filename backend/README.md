# CineBook Backend API

A RESTful API for the CineBook movie ticket booking application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `config.env` and update the values:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure secret key for JWT tokens
     - `PORT`: Server port (default: 5000)

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Movies
- `GET /api/movies` - Get all movies (with optional filters: genre, language, status)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Add a new movie (Admin only)
- `PUT /api/movies/:id` - Update movie (Admin only)
- `DELETE /api/movies/:id` - Delete movie (Admin only)

### Theatres
- `GET /api/theatres` - Get all theatres (with optional location filter)
- `GET /api/theatres/:id` - Get theatre by ID
- `POST /api/theatres` - Add a new theatre (Admin only)
- `PUT /api/theatres/:id` - Update theatre (Admin only)
- `DELETE /api/theatres/:id` - Delete theatre (Admin only)

### Showtimes
- `GET /api/showtimes` - Get all showtimes (with optional filters: movie, theatre, date)
- `GET /api/showtimes/:id` - Get showtime by ID
- `POST /api/showtimes` - Add a new showtime (Admin only)
- `PUT /api/showtimes/:id` - Update showtime (Admin only)
- `DELETE /api/showtimes/:id` - Delete showtime (Admin only)

### Bookings
- `GET /api/bookings/my-bookings` - Get user's booking history
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id/cancel` - Cancel a booking

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/bookings` - Get booking analytics
- `GET /api/admin/analytics/movies` - Get movie performance analytics

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Role-Based Access Control

- **User Role**: Can view movies, make bookings, view their profile
- **Admin Role**: Can perform all operations including managing movies, theatres, showtimes, and users

## Database Models

- **User**: name, email, password, role
- **Movie**: title, genre, language, cast, trailerUrl, releaseDate, synopsis, poster, status
- **Theatre**: name, location, screens
- **Showtime**: movie, theatre, screen, time, seatLayout, price
- **Booking**: user, showtime, selectedSeats, totalAmount, paymentStatus

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error 