import React, { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={` bg-gray-100 text-gray-800 flex  transition-all duration-300`}
      >
        

        {/* Sidebar Navigation */}
        <div className="mt-4">
          <ul className="flex">
            
            <li>
              <NavLink
                to="/readytable"
                className={({ isActive }) =>
                  `flex items-center ml-12 py-2 text-gray-800 hover:bg-gray-700 rounded ${
                    isActive ? "border-b-2 border-blue-600" : ""
                  }`
                }
              >
                <span className="flex justify-center mr-2 ">
                  <LuLayoutDashboard />
                </span>
                {"Ready"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/progresstable"
                className={({ isActive }) =>
                  `flex items-center ml-12 py-2 text-gray-800 hover:bg-gray-700 rounded ${
                    isActive ? "border-b-2 border-blue-600" : ""
                  }`
                }
              >
                <span className="flex justify-center mr-2">
                  <MdOutlineFamilyRestroom />
                </span>
                {"Progress"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/deliveredtable"
                className={({ isActive }) =>
                  `flex items-center ml-12 py-2 text-gray-800 hover:bg-gray-700 rounded ${
                    isActive ? "border-b-2 border-blue-600" : ""
                  }`
                }
              >
                <span className="flex justify-center mr-2">
                  <MdOutlineRestaurant />
                </span>
                {"Delivered"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className=" p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
