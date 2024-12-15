// src/Navbar.js
import React from 'react';


const Navbar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 left-0 w-full p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Vehicle Management</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">About Us</a>
          </li>
          <li>
            <a href='#' className="text-white hover:text-gray-300">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;