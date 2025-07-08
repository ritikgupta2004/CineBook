export default function BookingSummaryPage() {
    return (
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b">
          <div className="text-xl font-bold">Movies Stream</div>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search for movies"
              className="px-4 py-2 border rounded-full w-72"
            />
            <nav className="flex space-x-6 text-sm">
              <a href="#">Now Showing</a>
              <a href="#">Support</a>
              <button className="px-4 py-1 border rounded-full">Log in</button>
            </nav>
          </div>
        </header>
  
        {/* Booking Info */}
        <main className="px-8 py-8">
          <div className="flex space-x-6 mb-6">
            <button className="text-base font-semibold border-b-2 border-black">Your Bookings</button>
            <button className="text-base text-gray-500">Upcoming</button>
          </div>
  
          <div className="bg-white border shadow-md p-6 rounded-xl w-full max-w-2xl">
            <div className="flex items-center space-x-6">
              <img
                src="https://via.placeholder.com/150"
                alt="The Great Adventure"
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold">The Great Adventure</h2>
                <p className="text-sm mt-1">
                  <strong>Release Date:</strong> 15/09/2023<br />
                  <strong>Start:</strong> 18:00<br />
                  <span>Doors open: 17:00</span>
                </p>
              </div>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="mt-16 bg-gray-100 py-8">
          <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4 font-semibold">Subscribe</h3>
              <div className="flex items-center border rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full focus:outline-none"
                />
                <button className="bg-red-500 text-white px-4 py-2">Submit</button>
              </div>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold">About Us</h3>
              <ul className="text-sm space-y-2">
                <li>About Press</li>
                <li>Media Kit</li>
                <li>Careers</li>
                <li>News</li>
                <li>Help</li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold">Connect with us</h3>
              <ul className="text-sm space-y-2">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>YouTube</li>
                <li>Instagram</li>
                <li>Snapchat</li>
              </ul>
            </div>
  
            <div>
              <h3 className="mb-4 font-semibold">For Filmmakers</h3>
              <ul className="text-sm space-y-2">
                <li>Collaboration</li>
                <li>Submit your film</li>
                <li>For studios</li>
                <li>Business</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-8 px-8 text-center text-sm text-gray-500">© 2025 Movies Stream</div>
        </footer>
      </div>
    );
  }
  