import React from "react";

export default function SearchWindowPage() {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 border-b">
          <div className="text-xl font-bold">Movies Stream</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for movies, genres, and actors"
              className="w-80 px-4 py-2 border rounded-full shadow-sm"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Search</button>
          </div>
        </header>
  
        {/* Category Bar */}
        <nav className="px-8 py-4 flex space-x-6 text-sm font-medium border-b">
          <a href="#" className="text-black border-b-2 border-black pb-1">Genres</a>
          <a href="#" className="text-gray-600">Top</a>
          <a href="#" className="text-gray-600">Late</a>
          <a href="#" className="text-gray-600">Pro</a>
        </nav>
  
        {/* Main Content Placeholder */}
        <main className="p-8">
          <p className="text-center text-gray-500">
            Search results will appear here...
          </p>
        </main>
  
        {/* Footer */}
        <footer className="bg-gray-100 p-8 mt-auto text-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Movies</h3>
              <ul className="space-y-1">
                <li>Genres</li>
                <li>Top Rated</li>
                <li>Upcoming</li>
                <li>Watchlist</li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Careers</li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Community</h3>
              <ul className="space-y-1">
                <li>For Partners</li>
                <li>Advertising</li>
                <li>Community</li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Help</h3>
              <ul className="space-y-1">
                <li>Support</li>
                <li>Mobile App</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-8 text-center text-gray-500">© 2025 Movies Stream</div>
        </footer>
      </div>
    );
  }
  