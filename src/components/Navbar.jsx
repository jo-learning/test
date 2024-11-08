import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillSunFill, BsFillMoonFill, BsSearch, BsCartFill } from 'react-icons/bs';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark' || false;
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme);
  }, []);

  // Toggle theme and save to localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <nav className="text-black p-4 flex justify-between items-center shadow-md bg-primary  dark:bg-gray-800">
      <Link to="/" className="text-lg font-semibold">Zos</Link>

      {/* Responsive Search Bar */}
      <div className="flex items-center">
        <div className="hidden sm:block mr-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-1 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button className="sm:hidden p-2">
          <BsSearch />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-lg text-gray-300">
          {darkMode ? <BsFillSunFill size={13} /> : <BsFillMoonFill size={13} />}
        </button>

        {/* Cart Icon */}
        <Link to="/cart" className="text-lg">
          <BsCartFill />
        </Link>

        {/* Login Link */}
        <Link to="/signin" className="text-white dark:text-gray-200">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
