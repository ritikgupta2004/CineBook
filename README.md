# CineBook - Movie Ticket Booking System

A full-stack movie ticket booking web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that replicates core functionality of BookMyShow.

## 🎬 Features

### User Features
- **User Authentication** - Register, login, and logout with JWT
- **Movie Browsing** - Browse movies with filters (genre, language, status)
- **Movie Details** - View movie information, cast, synopsis, and trailer
- **Showtime Selection** - Choose from available showtimes
- **Interactive Seat Selection** - Visual seat layout with real-time availability
- **Booking System** - Book tickets with seat confirmation
- **Booking History** - View past and upcoming bookings
- **Booking Cancellation** - Cancel bookings with seat release

### Admin Features
- **Dashboard Analytics** - Statistics overview (users, movies, theatres, revenue)
- **Movie Management** - Add, edit, delete movies with full details
- **Theatre Management** - Manage theatres and screens
- **Showtime Management** - Create and manage showtimes with seat layouts
- **User Management** - View users, manage roles, delete users
- **Booking Analytics** - View recent bookings and top-performing movies

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling framework
- **Context API** - State management

## 📁 Project Structure

```
Cinebook/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   ├── Theatre.js
│   │   ├── Showtime.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── movies.js
│   │   ├── theatres.js
│   │   ├── showtimes.js
│   │   ├── bookings.js
│   │   ├── users.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── config.env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Movies.js
    │   │   ├── MovieDetail.js
    │   │   ├── Bookings.js
    │   │   ├── AdminDashboard.js
    │   │   └── admin/
    │   │       ├── MovieManagement.js
    │   │       ├── TheatreManagement.js
    │   │       ├── ShowtimeManagement.js
    │   │       └── UserManagement.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config.env` and update the values:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/cinebook
     JWT_SECRET=your_jwt_secret_key_here_change_in_production
     NODE_ENV=development
     ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Movies
- `GET /api/movies` - Get all movies (with filters)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Add a new movie (Admin only)
- `PUT /api/movies/:id` - Update movie (Admin only)
- `DELETE /api/movies/:id` - Delete movie (Admin only)

### Theatres
- `GET /api/theatres` - Get all theatres
- `GET /api/theatres/:id` - Get theatre by ID
- `POST /api/theatres` - Add a new theatre (Admin only)
- `PUT /api/theatres/:id` - Update theatre (Admin only)
- `DELETE /api/theatres/:id` - Delete theatre (Admin only)

### Showtimes
- `GET /api/showtimes` - Get all showtimes (with filters)
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
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/bookings` - Get booking analytics
- `GET /api/admin/analytics/movies` - Get movie performance analytics

## 👥 User Roles

### User Role
- Browse movies and showtimes
- Make bookings and select seats
- View booking history
- Cancel bookings
- Update profile

### Admin Role
- All user permissions
- Access admin dashboard
- Manage movies, theatres, showtimes
- Manage users and roles
- View analytics and statistics

## 🎯 Usage Guide

### For Users
1. **Register/Login** - Create an account or login
2. **Browse Movies** - Use filters to find movies
3. **Select Movie** - Click on a movie to view details
4. **Choose Showtime** - Select date, time, and theatre
5. **Select Seats** - Choose seats from the interactive layout
6. **Confirm Booking** - Review and confirm your booking
7. **View Bookings** - Check your booking history

### For Admins
1. **Access Admin Dashboard** - Navigate to `/admin`
2. **Manage Content** - Use the quick action buttons
3. **Add Movies** - Fill in movie details and upload poster
4. **Manage Theatres** - Add theatres with screens
5. **Create Showtimes** - Set up showtimes with seat layouts
6. **Monitor Users** - View and manage user accounts
7. **View Analytics** - Check booking statistics and revenue

## 🔧 Customization

### Adding New Features
- **Payment Integration** - Integrate Stripe/Razorpay for payments
- **Email Notifications** - Send booking confirmations via email
- **Push Notifications** - Add real-time notifications
- **Rating System** - Allow users to rate movies
- **Advanced Analytics** - Add more detailed reporting

### Styling
- Modify TailwindCSS classes in components
- Update color schemes in `tailwind.config.js`
- Add custom CSS in `src/index.css`

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `config.env`

2. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in environment variables

3. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend API base URL

4. **Port Conflicts**
   - Change ports in `config.env` and `package.json`
   - Ensure ports are not in use by other applications

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Happy Movie Booking! 🎬🍿** 