import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineRestaurant, MdOutlineFamilyRestroom } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiSolidDrink } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { FaPerson } from "react-icons/fa6";
import { FiMenu, FiChevronLeft } from "react-icons/fi"; // Toggle icons

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar toggle state

  useEffect(()=>{
    const collapse = localStorage.getItem("collapse")
    if (collapse == "true"){
     setIsCollapsed(true);
    }else if (collapse == "false"){
      setIsCollapsed(false);
    }
  },[])

  const handleOnCollapsed = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem("collapse", !isCollapsed)
  } 

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" >
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white flex-shrink-0 transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {!isCollapsed && (
            <span className="font-bold text-xl">My Dashboard</span>
          )}
          <button
            className="text-white p-2 hover:bg-gray-700 rounded"
            onClick={() => handleOnCollapsed()}
          >
            {isCollapsed ? <FiMenu /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <LuLayoutDashboard />
                </span>
                {!isCollapsed && "Dashboard"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ordersummary"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <LuLayoutDashboard />
                </span>
                {!isCollapsed && "Order Summary"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customertable"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <MdOutlineFamilyRestroom />
                </span>
                {!isCollapsed && "Customers"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resturanttable"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <MdOutlineRestaurant />
                </span>
                {!isCollapsed && "Restaurants"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categorytable"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <TbCategory2 />
                </span>
                {!isCollapsed && "Category"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/drivertable"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <FaPerson />
                </span>
                {!isCollapsed && "Drivers"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vehicletable"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700 rounded ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span className="flex justify-center mx-5">
                  <FaCar />
                </span>
                {!isCollapsed && "Vehicles"}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
