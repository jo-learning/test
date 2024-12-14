import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function AdminCategoryTable() {
  const allUsers = [
    {
      id: "USR001",
      categoryName: "Fasting",
      items: 0,
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Elm Street, Springfield",
    },
    {
      id: "USR002",
      categoryName: "Non Fasting",
      items: 0,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Avenue, Metropolis",
    },
    {
      id: "USR003",
      categoryName: "Drinks",
      items: 0,
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine Road, Gotham",
    },
    {
      id: "USR004",
      categoryName: "Food",
      items: 0,
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "555-987-6543",
      address: "321 Cedar Lane, Star City",
    },
    {
      id: "USR005",
      categoryName: "Burger",
      items: 0,
      fullName: "Cathy White",
      email: "cathy.white@example.com",
      phone: "444-555-6666",
      address: "654 Maple Boulevard, Central City",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        Category
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
      <div className="flex justify-end mb-2">
      <button className="px-4 py-2  flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
        <CiCirclePlus size={28}/>
          Add Category
        </button></div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                items
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
                  {user.categoryName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.items}
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="ml-2 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                    Delete
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
