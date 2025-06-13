import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { API_KEY } from "../data";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await result.json();
      const filtered = data.results
        .filter(
          (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            item.poster_path
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } catch (err) {
      console.error("Suggestion fetch failed:", err);
    }
  };

  const handleNavigate = (item) => {
    const route =
      item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
    navigate(route);
    setSearchQuery("");
    setSuggestions([]);
    setShowSearch(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleNavigate(suggestions[0]);
    }
  };

  return (
    <div className="w-full bg-black text-white relative z-50">
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to={`/`} className="flex items-center gap-4">
            <img
              src="/Movielogo.png"
              alt="Movix logo"
              className="h-10 w-10 object-contain"
            />
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              Movix
            </h2>
          </Link>
        </div>

        {/* for Desktop Search */}
        <div className="hidden md:block relative w-full max-w-xl mx-8">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              placeholder="Search movies here.."
              className="w-full px-4 py-2 rounded-l bg-slate-800 text-white focus:outline-none shadow-md"
            />
            <button className="px-4 py-2 bg-slate-700 rounded-r hover:bg-slate-600 transition">
              <FaSearch />
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-slate-900 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {item.title || item.name}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {item.media_type === "tv" ? "TV Show" : "Movie"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Icon(Mobile) */}
        <span
          onClick={toggleSearch}
          className="p-2 bg-slate-900 rounded md:hidden flex items-center justify-center hover:bg-slate-800 transition cursor-pointer"
        >
          <FaSearch className="text-sm" />
        </span>
      </div>

      {/* Search Bar (Mobile) */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 relative">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-l bg-slate-800 text-white focus:outline-none shadow-md"
            />
            <button className="px-4 py-2 bg-slate-700 rounded-r hover:bg-slate-600 transition">
              <FaSearch />
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-slate-900 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavigate(item)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {item.title || item.name}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {item.media_type === "tv" ? "TV Show" : "Movie"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
