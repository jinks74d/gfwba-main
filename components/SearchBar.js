// components/SearchBar.js
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    // setSearchTerm("");
  };

  return (
    <div className="border border-[#B3B3B3] flex items-center">
      <input
        className="p-[5px] w-[365px] outline-none"
        type="text"
        // placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(event) => {
          event.key === "Enter" && handleSearch();
        }}
      />
      <button
        className="bg-[#B3B3B3] text-white p-[5px] text-[20px]"
        onClick={handleSearch}
      >
        🔎︎
      </button>
    </div>
  );
};

export default SearchBar;
