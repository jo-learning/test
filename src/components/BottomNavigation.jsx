import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaThList, FaTags, FaUser } from 'react-icons/fa';

function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 sm:hidden">
      <div className="flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link to="/cart" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FaShoppingCart size={20} />
          <span className="text-xs">Cart</span>
        </Link>
        
        <Link to="/category" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FaThList size={20} />
          <span className="text-xs">Category</span>
        </Link>
        
        <Link to="/new" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FaTags size={20} />
          <span className="text-xs">New</span>
        </Link>
        
        <Link to="/account" className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
          <FaUser size={20} />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavigation;
