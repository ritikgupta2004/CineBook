import { useState } from "react";

export default function MovieFilterPopup() {
  const [rating, setRating] = useState({ min: 3.0, max: 10.0 });
  const [genre, setGenre] = useState("Action");
  const [preferences, setPreferences] = useState({
    upcoming: true,
    tickets: true,
    watch: true,
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Filter</h2>

        {/* Rating Range */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select filters</label>
          <div className="flex justify-between text-sm mb-1">
            <span>Min. rating</span>
            <span>Max. rating</span>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={rating.min}
              onChange={(e) => setRating({ ...rating, min: e.target.value })}
              className="w-1/2 px-3 py-2 border rounded"
            />
            <input
              type="number"
              value={rating.max}
              onChange={(e) => setRating({ ...rating, max: e.target.value })}
              className="w-1/2 px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Genre Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Genre</label>
          <div className="flex space-x-4">
            {[
              { name: "Action", icon: "🎬" },
              { name: "Comedy", icon: "😂" },
              { name: "Drama", icon: "🎭" },
            ].map((item) => (
              <button
                key={item.name}
                className={`flex flex-col items-center px-4 py-2 border rounded-lg text-sm ${
                  genre === item.name ? "bg-red-500 text-white" : "bg-white"
                }`}
                onClick={() => setGenre(item.name)}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Preferences */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Additional preferences</label>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <input type="text" placeholder="Language" className="px-3 py-2 border rounded" />
            <input type="text" placeholder="Release year" className="px-3 py-2 border rounded" />
          </div>
          <div className="flex space-x-4 text-sm">
            <label>
              <input type="checkbox" className="accent-red-500 mr-2" checked /> Short
            </label>
            <label>
              <input type="checkbox" className="accent-red-500 mr-2" checked /> Medium
            </label>
          </div>
        </div>

        {/* Toggles */}
        <div className="mb-4 text-sm">
          {[
            { key: "upcoming", label: "Upcoming releases" },
            { key: "tickets", label: "Book tickets" },
            { key: "watch", label: "Watch" },
          ].map((opt) => (
            <div key={opt.key} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={preferences[opt.key]}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    [opt.key]: !preferences[opt.key],
                  })
                }
                className="accent-red-500 mr-2"
              />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button className="px-4 py-1 border rounded-full">Clear filters</button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-full">Find movies</button>
        </div>
      </div>
    </div>
  );
}
