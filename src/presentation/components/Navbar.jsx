import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../shared/utils/ThemeContext";
import CounterContext from "../../shared/utils/CartCounter";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill, BsSearch } from "react-icons/bs";
import { CiSliderVertical } from "react-icons/ci";
import image1 from "../../assets/zos.png";
import { FaShoppingCart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import UserContext from "../../shared/utils/UserContext";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {counter} = useContext(CounterContext);
  const {user, LoggedOutUser} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logged out");
    LoggedOutUser();
    // Add your logout logic here
  };

  const addItemToCart = () => {
    setCartCount(cartCount + 1); // Example function to increment cart count
  };

  // Load theme preference from localStorage on initial load
  useEffect(() => {

  }, []);

  return (
    <nav className="">
      <div className="bg-black text-black p-4 flex justify-between items-center shadow-md bg-primary  dark:bg-gray-800">
        <Link to="/" className="text-lg font-semibold">
          <img src={image1} className="w-10 h-10" alt="Zos" />
        </Link>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          {/* <button onClick={toggleDarkMode} className="text-lg text-gray-300">
          {darkMode ? <BsFillSunFill size={13} /> : <BsFillMoonFill size={13} />}
        </button> */}
          {/* Cart Icon */}
          <Link to="/cart" className="text-lg">
            {/* <p className="relative text-white bg-red-500 rounded-full m-0 p-0 text-center text-[10px]">1</p> */}
            {counter > 0 && (
              <span className="absolute mx-4 -my-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {counter}
              </span>
            )}
            <FaShoppingCart size={23} className="" />
            {/* Counter Badge */}
          </Link>

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

          <Link to="/cart" className="rounded-lg text-lg bg-white">
            <CiSliderVertical size={27} className="text-brand-primary" />
          </Link>
          <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
      </button>

            {user.length > 0 ? 
            (
              <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:ring-2 hover:ring-blue-500"
      >
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2">
            <button
              onClick={() => console.log("Go to Profile")}
              className="block w-full px-4 py-2 text-sm text-gray-400 bg-white hover:bg-gray-700"
            >
              Profile
            </button>
            <Link to={'/dashboard'}>
            <button
              onClick={() => console.log("Go to Profile")}
              className="block w-full px-4 py-2 text-sm text-gray-400 bg-white hover:bg-gray-700"
            >
              Dashboard
            </button>
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-gray-400 bg-white hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicked outside */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-0"
        ></div>
      )}
    </div>
            )
            : (
              <Link to="/signin" className="text-white dark:text-gray-200">
                Login
              </Link>)}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
