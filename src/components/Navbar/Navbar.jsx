import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { getInitails } from '../../utils/Helper'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <nav className="bg-gradient-to-r rounded-lg from-indigo-400  to-purple-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <h2 className="text-2xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform">
          📝 Notes
        </h2>

        {/* Center: Search Bar */}
        {userInfo && (
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>
        )}

        {/* Right: Profile + Logout */}
        {userInfo && (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-11 h-11 flex items-center justify-center rounded-full 
              bg-gradient-to-br from-yellow-400 to-orange-500 text-black 
              font-bold text-lg shadow-md ring-2 ring-offset-2 ring-white"
            >
              {getInitails(userInfo?.fullName)}
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 
              bg-red-500 hover:bg-red-600 text-white text-sm font-medium 
              rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
