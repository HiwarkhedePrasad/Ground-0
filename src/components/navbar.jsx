import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import { Globe } from 'lucide-react'; // Import Globe icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">DevConnect</h1>
          </div>
          {/* Desktop menu */}
          <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/search-location" className="text-gray-600 hover:text-gray-900">
              Search by Location
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              Messages
            </Link>
            <button className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="sm:hidden text-gray-600"
            onClick={toggleMenu}
          >
            <span className="material-icons">menu</span> {/* You can use any icon here */}
          </button>
        </div>
      </header>

      {/* Mobile sliding menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 sm:hidden transition-transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={toggleMenu} // Close the menu when clicking outside
      >
        <div
          className="bg-white w-64 h-full absolute top-0 right-0 transform transition-transform"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
        >
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/search-location"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={toggleMenu}
            >
              Search by Location
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={toggleMenu}
            >
              Events
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={toggleMenu}
            >
              Messages
            </Link>
            <button
              className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
              onClick={toggleMenu}
            >
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
