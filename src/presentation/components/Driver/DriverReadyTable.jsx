import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function RestaurantFoodTable() {
  const allUsers = [
    {
      id: "USR001",
      restaurantName: "Shege",
      foodName: "Special Burger",
      category: "Burger",
      phone: "123-456-7890",
      price: "123",
    },
    {
      id: "USR002",
      foodName: "Special Pizza",
      restaurantName: "Shege",
      category: "Pizza",
      phone: "987-654-3210",
      price: "456",
    },
    {
      id: "USR003",
      foodName: "Special Pizza",
      restaurantName: "Shege",
      category: "Pizza",
      phone: "555-123-4567",
      price: "789",
    },
    {
      id: "USR004",
      foodName: "Bob Brown",
      restaurantName: "Shege",
      category: "Burger",
      phone: "555-987-6543",
      price: "321",
    },
    {
      id: "USR005",
      foodName: "Cathy White",
      restaurantName: "Shege",
      category: "Burger",
      phone: "444-555-6666",
      price: "300",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredUsers = allUsers.filter(
    (user) =>
      user.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Ready table
      </h1>

      {/* Search Bar and Add Restaurant Button */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-gray-800 bg-white border rounded-md dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 mr-4"
        />
        
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Restaurant Phone
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Restaurant Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Restaurant Address
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Time
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Phone
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Address
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.foodName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                {user.restaurantName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.price}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.phone}
                </td>
                <td className="flex px-4 py-3">
                  <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Pick
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-3 py-1 text-sm ${
            currentPage === 1
              ? "text-gray-400 bg-gray-200 cursor-not-allowed"
              : "text-white bg-blue-600 hover:bg-blue-700"
          } rounded`}
        >
          &lt;
        </button>
        <span className="text-gray-800 dark:text-gray-300">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1 text-sm ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-200 cursor-not-allowed"
              : "text-white bg-blue-600 hover:bg-blue-700"
          } rounded`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}