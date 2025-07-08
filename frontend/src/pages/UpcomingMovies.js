import React from "react";

const movies = [
  {
    title: "Finding Nemo",
    genre: "Animated, Family",
    release: "05/08/2023",
    price: "₹830",
    color: "bg-red-500",
    image: "https://i.ibb.co/YbDdNB9/nemo.jpg",
  },
  {
    title: "The Matrix",
    genre: "Sci-Fi, Action",
    release: "12/08/2023",
    price: "₹996",
    color: "bg-pink-200",
    image: "https://i.ibb.co/CBzgFKS/matrix.jpg",
  },
  {
    title: "Titanic",
    genre: "Romance, Drama",
    release: "19/08/2023",
    price: "₹1245",
    color: "bg-pink-200",
    image: "https://i.ibb.co/Xt3Lnt3/titanic.jpg",
  },
  {
    title: "Avatar",
    genre: "Sci-Fi, Adventure",
    release: "26/08/2023",
    price: "₹1496",
    color: "bg-pink-200",
    image: "https://i.ibb.co/4VgjbNw/avatar.jpg",
  },
  {
    title: "The Lion King",
    genre: "Animated, Family",
    release: "02/09/2023",
    price: "₹830",
    color: "bg-pink-200",
    image: "https://i.ibb.co/wN64GyK/lionking.jpg",
  },
  {
    title: "Jurassic Park",
    genre: "Action, Adventure",
    release: "09/09/2023",
    price: "₹1164",
    color: "bg-pink-200",
    image: "https://i.ibb.co/yh8vb4F/jurassic.jpg",
  },
  {
    title: "The Godfather",
    genre: "Drama, Crime",
    release: "16/09/2023",
    price: "₹1662",
    color: "bg-white",
    image: "https://i.ibb.co/WnnxtfR/godfather.jpg",
  },
];

export default function UpcomingMovies() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md">
        <div className="text-2xl font-bold">🎬 Movies</div>
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li>Home</li>
          <li className="text-black font-bold">Upcoming</li>
          <li>Book Now</li>
          <li>Help</li>
        </ul>
        <input
          type="text"
          placeholder="Search movies"
          className="rounded-full px-4 py-1 border outline-none"
        />
      </nav>

      {/* Banner */}
      <div className="relative m-4 rounded-xl overflow-hidden">
        <img
          src="https://i.ibb.co/PrPfLD5/inception.jpg"
          alt="banner"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-red-600 bg-opacity-40 flex flex-col justify-center p-6 text-white font-bold text-3xl">
          Inception
          <p className="text-base font-normal mt-2">Experience the thrill of cinema!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 px-4 mt-2">
        {["Location", "Showtimes", "Genre", "Rating", "Price"].map((item) => (
          <select key={item} className="px-4 py-2 rounded-md border shadow">
            <option>{item}</option>
          </select>
        ))}
      </div>

      {/* Movie Cards */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">20 movies available</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-md ${movie.color}`}
            >
              <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm">{movie.genre}</p>
                <p className="text-sm font-medium">Release: {movie.release}</p>
                <p className="text-sm mt-2 font-bold text-black">from {movie.price}</p>
              </div>
            </div>
          ))}

          {/* Load more card */}
          <div className="rounded-xl overflow-hidden shadow-md bg-red-500 text-white flex flex-col justify-between p-4">
            <div>
              <h3 className="font-semibold text-lg">Load more</h3>
              <p>Upcoming Events</p>
            </div>
            <p className="text-sm font-bold">Join our community</p>
            <p className="text-sm mt-2 font-bold">from ₹1662</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 p-6 text-sm bg-gray-100 flex flex-wrap justify-between">
        <div>
          <h4 className="font-semibold mb-2">Movies</h4>
          <div className="flex gap-4">
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
      </footer>
    </div>
  );
}
