import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const username = localStorage.getItem("username");

  return (
    <nav className="sticky top-0 bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/message/create" className="text-xl sm:text-2xl font-bold text-indigo-400">
          DropMessage
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/message/create" className="hover:text-indigo-300 transition-colors">
              Create
            </Link>
          </li>
          {username && (
            <li>
              <Link to={`/u/${username}`} className="hover:text-indigo-300 transition-colors">
                View All
              </Link>
            </li>
          )}
          <li>
            <Link to="/findbyslug" className="hover:text-indigo-300 transition-colors">
              Find
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none hover:bg-gray-800 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-gray-900 px-4 pb-4 space-y-2">
          <li>
            <Link
              to="/message/create"
              className="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
          </li>
          {username && (
            <li>
              <Link
                to={`/u/${username}`}
                className="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/findbyslug"
              className="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
