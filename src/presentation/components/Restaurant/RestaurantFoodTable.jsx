import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../../data/services/apiClient";

export default function RestaurantFoodTable() {
  // const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 3;
  const [totalCount, setTotalCount] = useState(0); // To store the total count of users

  // Fetch users from API with pagination, sorting, and search parameters
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch(
        //   // `http://localhost:3010/api/food/fetchFoods?page=${currentPage}&limit=${itemsPerPage}&sortBy=foodName&sortOrder=asc&search=${searchTerm}`
        //   `http://localhost:3010/api/food/fetchFoods?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`
        // );
        const response = await apiClient.get(`/api/food/fetchFoods?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`)
        if (response.data.success) {
          const data = await response.data;
          console.log(data)
          // setAllUsers(data.data); // Assuming the API returns an 'items' array
          setTotalCount(data.data.length); // Assuming the API returns a 'totalCount'
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

  // const handleEditClick = (user) => {
  //   // setEditingUser(user);
  //   // setIsEditModalOpen(true);
  // };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleEditSave = () => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === editingUser.id ? editingUser : user
  //     )
  //   );
  //   setIsEditModalOpen(false);
  // };

  // const handleEditCancel = () => {
  //   setEditingUser(null);
  //   setIsEditModalOpen(false);
  // };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleDelete = () => {
  //   alert("Item deleted!");
  //   setIsModalOpen(false);
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const displayedUsers = users; // Users to display are already set after fetch

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Food List
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
        <NavLink to={"/foodform"}>
          <button className="px-4 py-2 flex justify-center text-center items-center text-sm text-white bg-blue-600 rounded hover:bg-green-700">
            <CiCirclePlus size={28} />
            Add Food
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
                  {user.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.restaurant.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.category.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.price}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.restaurant.phoneNumber[0]}
                </td>
                <td className="flex px-4 py-3">
                  <button
                    // onClick={() => handleEditClick(user)}
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
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

      {/* Modal logic and edit modal omitted for brevity */}
    </div>
  );
}
