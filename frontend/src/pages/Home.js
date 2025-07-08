import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm">
        <h1 className="text-xl font-bold">Movies</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-red-500">Home</a>
          <Link to="/upcoming" className="hover:text-red-500">Now Showing</Link>
          <Link to="/upcoming" className="hover:text-red-500">Upcoming</Link>
          <a href="#" className="hover:text-red-500">Book Tickets</a>
        </nav>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded border bg-white hover:bg-gray-100 text-gray-900">Log in</button>
          <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">Sign up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex justify-between items-center px-16 py-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Find and book your favorite movies effortlessly!</h2>
          <p className="mb-6">Start booking your tickets today.</p>
          <button className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white">Get Tickets</button>
        </div>
        <img src="/movie-icon.png" alt="Movie Icon" className="w-64" />
      </section>

      {/* Movie List */}
      <section className="px-16 py-8">
        <h3 className="text-xl font-semibold mb-6">Explore Current & Upcoming Movies</h3>
        <div className="grid grid-cols-5 gap-6">
          {[
            { title: "The Avengers", genre: "Action, Adventure," },
            { title: "Inception", genre: "Mind-bending thriller" },
            { title: "Titanic", genre: "Epic romance" },
            { title: "The Godfather", genre: "Classic crime drama" },
            { title: "Coming Soon!", genre: "Anticipated Blockbusters" },
          ].map((movie, idx) => (
            <div key={idx}>
              <div className="h-40 bg-gray-300 rounded mb-2"></div>
              <h4 className="font-medium">{movie.title}</h4>
              <p className="text-sm text-gray-600">{movie.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Movie Categories */}
      <section className="px-16 py-8">
        <h3 className="text-xl font-semibold mb-4">Movie Categories</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Action", "Comedy", "Drama", "Horror", "Romance", "Thriller", "Family", "Sci-Fi", "Documentary",
            "Animation", "Fantasy", "Adventure", "Mystery", "Historical", "Musical", "Western", "Biographical"
          ].map((cat, idx) => (
            <span
              key={idx}
              className={`px-4 py-1 rounded-full border ${[
                "Horror", "Thriller", "Adventure", "Historical", "Biographical"
              ].includes(cat) ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Ticket Pricing */}
      <section className="px-16 py-12 bg-gray-50">
        <h3 className="text-xl font-semibold mb-8 text-center">Choose Your Ticket</h3>
        <div className="flex justify-center gap-12">
          <div className="w-64 text-center bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-2">Standard</h4>
            <p className="text-2xl font-bold mb-4">₹12</p>
            <ul className="space-y-2 text-sm mb-4">
              <li>✓ 1 movie ticket</li>
              <li>✓ Standard seating</li>
              <li>✓ Instant confirmation</li>
            </ul>
            <button className="px-6 py-2 rounded border bg-white hover:bg-gray-100 text-gray-900">Book Now</button>
          </div>

          <div className="w-64 text-center bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-2">VIP</h4>
            <p className="text-2xl font-bold mb-4">₹25</p>
            <ul className="space-y-2 text-sm text-left mb-4">
              <li>✔ Premium seating</li>
              <li>✔ Free snacks</li>
              <li>✔ Instant confirmation</li>
            </ul>
            <button className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white">Book VIP</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-16 py-8 text-sm bg-white border-t mt-8">
        <div className="flex justify-between">
          <div>
            <h4 className="font-semibold mb-2">Movies</h4>
            <div className="flex space-x-2">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <p>About Us</p>
            <p>Careers</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Community</h4>
            <p>For Partners</p>
            <p>Advertising</p>
            <p>Community</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Help</h4>
            <p>Support</p>
            <p>Mobile App</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 