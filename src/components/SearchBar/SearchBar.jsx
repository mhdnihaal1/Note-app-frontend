import React from "react";
import { MdSearch, MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search notes..."
        className="
          w-full pl-10 pr-10 py-2 rounded-full border border-slate-300 
          text-sm sm:text-base text-slate-800 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          shadow-sm transition-all
        "
      />

      {/* Search Icon (left inside input) */}
      <button
        onClick={handleSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
      >
        <MdSearch className="text-lg sm:text-xl" />
      </button>

      {/* Clear Icon (right inside input) */}
      {value && (
        <button
          onClick={onClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
        >
          <MdClose className="text-lg sm:text-xl" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
