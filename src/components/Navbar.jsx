import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill, BsSearch } from "react-icons/bs";
import image1 from "../assets/zos.png";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {

  // Load theme preference from localStorage on initial load
  useEffect(() => {
  }, []);


  return (
    <nav className="">
      <div className="bg-gray-300 text-black p-4 flex justify-between items-center shadow-md bg-primary  dark:bg-gray-800">
      <Link to="/" className="text-lg font-semibold">
        <img src={image1} className="w-10 h-10" alt="Zos" />
      </Link>


      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        {/* <button onClick={toggleDarkMode} className="text-lg text-gray-300">
          {darkMode ? <BsFillSunFill size={13} /> : <BsFillMoonFill size={13} />}
        </button> */}

<div className="relative w-full sm:max-w-xs">
  <input
    type="text"
    placeholder="Search products..."
    className="p-2 pl-3 pr-10 w-full rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
  />
  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
    <BsSearch />
  </button>
</div>


        

        {/* Cart Icon */}
        <Link to="/cart" className="text-lg">
          <FaShoppingCart size={20} className="" />
        </Link>

        {/* Login Link */}
        <Link to="/signin" className="text-white dark:text-gray-200">
          Login
        </Link>
      </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-800">
        <ul className="flex space-x-5 pl-4">
          <li className="font-bold underline">All</li>
          <li className="font-bold">Food</li>
          <li className="font-bold">Clothing</li>
          <li className="font-bold">Electronics</li>
          <li className="font-">Beauty</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
