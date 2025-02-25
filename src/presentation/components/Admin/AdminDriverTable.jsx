import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
import "jspdf-autotable";
import DownloadCSVorPDF from "../lib/download";
import RecordsPerPage from "../lib/recordsPerPage";
import { apiClient } from "../../../data/services/apiClient";
import useDebounce from "../lib/debounceSearch";

export default function AdminDriverTable() {
  const allUsers = [];

  // const [users, setUsers] = useState(allUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleEditSave = () => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
  //   );
  //   setIsEditModalOpen(false);
  // };

  // const handleEditCancel = () => {
  //   setEditingUser(null);
  //   setIsEditModalOpen(false);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    alert("Item deleted!");
    setIsModalOpen(false); // Close modal after confirmation
  };

  const [searchTerm, setSearchTerm] = useState("");


  const debouncedSearchQuery = useDebounce(searchTerm, 500); // 500ms debounce delay

  useEffect(() => {
    if (debouncedSearchQuery) {
      // Perform the search API call or logic here
      console.log('Searching for:', debouncedSearchQuery);

      const handleSearch = async() => {
        setCurrentPage(1); // Reset to the first page on a new search
    const response = await apiClient.get(`/api/driver/fetchDrivers?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc&search=${debouncedSearchQuery}`)
    console.log(response)
    let user = response.data.data;
    setSortedUsers(user);
    setTotalPages(response.data.pagination.total)
      }
      handleSearch()




    }
  }, [debouncedSearchQuery]);




  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  // const itemsPerPage = 3;

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [totalPages, setTotalPages] = useState(0);
  // const displayedUsers = filteredUsers.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedUsers, setSortedUsers] = useState(
    filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );

  const handleSort = async(column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    // console.log(direction)

    const response = await apiClient.get(`/api/driver/fetchDrivers?page=${currentPage}&limit=${itemsPerPage}&sortBy=${column}&sortOrder=${direction}`)
    // console.log(response)
    let user = response.data.data;


    setSortedUsers(user);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Users Table", 20, 10); // Add title

  //   const tableColumn = [
  //     "ID",
  //     "Restaurant Name",
  //     "Owner Name",
  //     "Email",
  //     "Phone",
  //     "Address",
  //   ];
  //   const tableRows = sortedUsers.map((user) => [
  //     user.id,
  //     user.restaurantName,
  //     user.fullName,
  //     user.email,
  //     user.phone,
  //     user.address,
  //   ]);

  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 20,
  //   });

  //   doc.save("users_table.pdf");
  // };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "fullName" },
    { label: "Sex", key: "sex" },
    { label: "User Name", key: "username" },
    { label: "Phone", key: "phone" },
  ];
  const handleFetchDriver = async () => {
    const response = await apiClient.get(
      `/api/driver/fetchDrivers?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`
    );
    console.log(response);
    setSortedUsers(response.data.data);
    setTotalPages(response.data.pagination.total);
  };
  const handleChange = (e, field, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedField = [...editingUser[field]];
      updatedField[index][name] = value;
      setEditingUser({ ...editingUser, [field]: updatedField });
    } else {
      setEditingUser({ ...editingUser, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editingUser);
  };
  useEffect(() => {
    // const column = "id";
    // setSortedUsers(filteredUsers.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // ))

    // `http://localhost:3010/api/food/fetchFoods?page=${currentPage}&limit=${itemsPerPage}&sortBy=foodName&sortOrder=asc&search=${searchTerm}`
    handleFetchDriver();

    // const direction =
    //   sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    // setSortColumn(column);
    // setSortDirection(direction);
    // const sortedData = [...displayedUsers].sort((a, b) => {
    //   if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
    //   if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
    //   return 0;
    // });
  }, [currentPage, searchTerm, itemsPerPage]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Drivers
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
        <DownloadCSVorPDF
        sortedUsers={sortedUsers}
        csvHeaders={csvHeaders}
        tableName={"Restaurant Table"}
      />
        <div className="flex justify-end mb-2">
          <NavLink to={"/driverform"}>
            <button className="px-4 py-2 whitespace-nowrap flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
              <CiCirclePlus size={28} />
              Add Driver
            </button>
          </NavLink>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {csvHeaders.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortColumn === column.key && (
                      <span className="ml-2">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
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
                  {user.sex}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.username}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      handleEditClick(user);
                    }}
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
      <div className="flex items-center justify-between mt-4">
        {/* Pagination Controls */}
        <div className="flex items-center justify-center flex-grow-0 w-full">
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
          <span className="mx-2 text-gray-800 dark:text-gray-300">
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

        <RecordsPerPage setItemsPerPage={setItemsPerPage} />
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
            <h2 className="text-lg font-semibold text-white">Are you sure?</h2>
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
        <div className=" fixed inset-0 z-50 flex  justify-center bg-black bg-opacity-50 overflow-y-scroll ">
        <div
          className="mt-20 bg-gray-600 rounded-lg shadow-lg p-6 w-[700px] overflow-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-white">Edit Food</h2>
          <button onClick={()=>setIsEditModalOpen(false)}>X</button></div>
          <div className="mt-4">
          <form
            onSubmit={handleSubmit}
            className="flex justify-around text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg"
          >
            <div>
              <div>
                <label className="block text-sm font-medium">Driver Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="sex"
                  value={editingUser.sex}
                  onChange={(e) => handleChange(e, "sex")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={editingUser.phoneNumber}
                  onChange={(e) => handleChange(e, "phoneNumber")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                />
              </div>

              {/* <div>
              <label className="block text-sm font-medium">Image</label>
              <div className="h-[200px] w-[200px] bg-gray-400 rounded-lg">
                {previewUrl && (
                  <div>
                    
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  </div>
                )}
              </div>
              <p>
                Upload a JPG or PNG image with dimension 291x194 pixel.<br></br>{" "}
                Maximum file size: 1 MB
              </p>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div> */}
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium">
                  Enter Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={(e) => handleChange(e, "username")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={editingUser.password}
                  onChange={(e) => handleChange(e, "password")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                />
              </div> */}
              {/* <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div> */}
              {/* <div>
              <label className="block text-sm font-medium">
                address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div> */}

              {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}

              <button
                type="submit"
                className="bottom-0 mt-10 w-full py-3 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}
