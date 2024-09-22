import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-800 rounded-full"></div>
          <span className="text-xl font-bold text-purple-800">PLANE SCAPE</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-purple-800">Deals</button>
          <button className="text-purple-800">Discover</button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Joane Smith</span>
          </div>
        </div>
      </header>
  );
}

export default Header;
