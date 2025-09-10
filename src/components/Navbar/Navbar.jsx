import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

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
    <div className="bg-white drop-shadow px-4 py-3">
      <div className="flex   sm:flex-row sm:items-center justify-between  gap-3">
        
        {/* Left: Logo */}
  <h2 className="text-2xl font-bold text-blue-600 tracking-wide flex  ">
          Notes
        </h2>
           {userInfo && (
          <div className="flex items-center justify-end">
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        )}
        

        {/* Center: Search Bar */}
      

        {/* Right: Profile Info */}
     
      </div>
      <div className="flex justify-center">
 {userInfo && (
          <div className="w-full sm:w-1/2 lg:w-1/3 flex">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>
        )}
      </div>
       
    </div>
  );
};

export default Navbar;
