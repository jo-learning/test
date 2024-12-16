import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function ResturantDrinkTable() {
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

  const [users, setUsers] = useState(allUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      )
    );
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    alert("Item deleted!");
    setIsModalOpen(false); // Close modal after confirmation
  };

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
        Drink List
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
        <NavLink to={"/drinkform"}>
          <button className="px-4 py-2  flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
            <CiCirclePlus size={28} />
            Add Drink
          </button>
        </NavLink>
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
                Food Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Restaurant Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
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
                <td className="flex px-4 py-3">
                  <button 
                  onClick={() => handleEditClick(user)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    onClick={toggleModal}
                    className="ml-2 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleModal} // Close the modal when clicking outside
        >
          {/* Modal Content */}
          <div
            className="bg-gray-600 rounded-lg shadow-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-lg font-semibold text-white">
              Are you sure?
            </h2>
            <p className="mt-2 text-white">
              Do you really want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-gray-600 rounded-lg shadow-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">Edit Food</h2>
            <div className="mt-4">
              <input
                type="text"
                name="foodName"
                value={editingUser.foodName}
                onChange={handleEditChange}
                className="w-full px-4 py-2 mb-4 text-gray-800 bg-white rounded"
                placeholder="Food Name"
              />
              <input
                type="text"
                name="restaurantName"
                value={editingUser.restaurantName}
                onChange={handleEditChange}
                className="w-full px-4 py-2 mb-4 text-gray-800 bg-white rounded"
                placeholder="Restaurant Name"
              />
              <input
                type="text"
                name="category"
                value={editingUser.category}
                onChange={handleEditChange}
                className="w-full px-4 py-2 mb-4 text-gray-800 bg-white rounded"
                placeholder="Category"
              />
              <input
                type="text"
                name="price"
                value={editingUser.price}
                onChange={handleEditChange}
                className="w-full px-4 py-2 mb-4 text-gray-800 bg-white rounded"
                placeholder="Price"
              />
              <input
                type="text"
                name="phone"
                value={editingUser.phone}
                onChange={handleEditChange}
                className="w-full px-4 py-2 mb-4 text-gray-800 bg-white rounded"
                placeholder="Phone"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEditCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
