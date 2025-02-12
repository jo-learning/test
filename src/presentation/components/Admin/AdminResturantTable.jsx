import { useState,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { apiClient } from "../../../data/services/apiClient";
import { PulseLoader } from "react-spinners";

// import recordsPerPage from "../lib/recordsPerPage";


import RecordsPerPage from "../lib/recordsPerPage";
import DownloadCSVorPDF from "../lib/download";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import useDebounce from "../lib/debounceSearch";

export default function AdminResturantTable() {
  const allUsers = [
  
  ];

  const [firsttimeloading, setFirstTimeLoading] = useState(false);
  // const [loading, setLoading] = useState(false);

  // const [users, setUsers] = useState(allUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  

  const handleEditClick = (user) => {
    
    // user.phoneNumber = JSON.parse(user.phoneNumber);
    // // user.workingHours = JSON.parse(user.workingHours);
    // user.email = JSON.parse(user.email)
    // user.website = JSON.parse(user.website)
    // user.socialMedia = JSON.parse(user.socialMedia)
    // user.cuisineType = JSON.parse(user.cuisineType)
    // user.geoLocation = JSON.parse(user.geoLocation)

    setEditingUser(user);
    console.log(user)
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
    const response = await apiClient.get(`/api/restaurant/fetchRestaurants?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc&search=${debouncedSearchQuery}`)
    console.log(response)
    let user = response.data.data;
    for (let i = 0; i < user.length; i++){
      user[i].phoneNumber = JSON.parse(user[i].phoneNumber);
    // user[i].workingHours = JSON.parse(user[i].workingHours);
    user[i].email = JSON.parse(user[i].email)
    user[i].website = JSON.parse(user[i].website)
    user[i].socialMedia = JSON.parse(user[i].socialMedia)
    user[i].cuisineType = JSON.parse(user[i].cuisineType)
    user[i].geoLocation = JSON.parse(user[i].geoLocation)
   
    }
    setSortedUsers(user);
    setTotalPages(response.data.pagination.total)
      }
      handleSearch()




    }
  }, [debouncedSearchQuery]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3)
  // const itemsPerPage = 3;

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [totalPages,setTotalPages] = useState(0)
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

  const handleAddInput = (field, index = null) => {
    const newData = { ...editingUser };
    if (index !== null) {
      setLast({ ...last, [field]: index + 1 });
    }
    newData[field].push({ key: "", value: "" });
    setEditingUser(newData);
  };

  const handleDeleteInput = (field, index) => {
    if (index !== null) {
      setLast({ ...last, [field]: last[field] - 1 });
    }
    const updatedArray = [...sortedUsers[field]];
    updatedArray.splice(index, 1); // Remove at specific index
    setEditingUser({
      ...sortedUsers,
      [field]: updatedArray,
    });
  };


  const [last, setLast] = useState({
    workingHours: 0,
    email: 0,
    phoneNumber: 0,
    // ambiance: 0,
    website: 0,
    socialMedia: 0,
    cuisineType: 0,
    address: 0,
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    let user = [editingUser].map(({foods, orders,restaurantReviews, ...rest})=> rest)
    user[0].email = [JSON.stringify(user[0].email)]
    user[0].phoneNumber = [JSON.stringify(user[0].phoneNumber)]
    user[0].website = [JSON.stringify(user[0].website)]
    user[0].socialMedia = [JSON.stringify(user[0].socialMedia)]
    user[0].cuisineType = [JSON.stringify(user[0].cuisineType)]
    user[0].geoLocation = [JSON.stringify(user[0].geoLocation)]
    console.log(user)
    const res = await apiClient.put(`/api/restaurant/updateRestaurant/${editingUser.id}`, user[0]);
    console.log(res);
    
  }

  const handleSort = async(column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    console.log(direction)

    const response = await apiClient.get(`/api/restaurant/fetchRestaurants?page=${currentPage}&limit=${itemsPerPage}&sortBy=${column}&sortOrder=${direction}`)
    console.log(response)
    let user = response.data.data;
    for (let i = 0; i < user.length; i++){
      user[i].phoneNumber = JSON.parse(user[i].phoneNumber);
    // user[i].workingHours = JSON.parse(user[i].workingHours);
    user[i].email = JSON.parse(user[i].email)
    user[i].website = JSON.parse(user[i].website)
    user[i].socialMedia = JSON.parse(user[i].socialMedia)
    user[i].cuisineType = JSON.parse(user[i].cuisineType)
    user[i].geoLocation = JSON.parse(user[i].geoLocation)
   
    }

    // Sort the users array
    // const sortedData = [...displayedUsers].sort((a, b) => {
    //   if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
    //   if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
    //   return 0;
    // });

    setSortedUsers(user);
  };

  const handleSearchChange = async(e) => {
    setSearchTerm(e.target.value);
  };


  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Restaurant Name", key: "restaurantName" },
    { label: "Owner Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ];

  const handleFetchRestaurant = async()=>{
    const response = await apiClient.get(`/api/restaurant/fetchRestaurants?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`)
    console.log(response)
    let user = response.data.data;
    for (let i = 0; i < user.length; i++){
      user[i].phoneNumber = JSON.parse(user[i].phoneNumber);
    // user[i].workingHours = JSON.parse(user[i].workingHours);
    user[i].email = JSON.parse(user[i].email)
    user[i].website = JSON.parse(user[i].website)
    user[i].socialMedia = JSON.parse(user[i].socialMedia)
    user[i].cuisineType = JSON.parse(user[i].cuisineType)
    user[i].geoLocation = JSON.parse(user[i].geoLocation)
   
    }
    setSortedUsers(user);
    setTotalPages(response.data.pagination.total)
    
    
  }

  useEffect(()=>{
    // const column = "id"
    // setSortedUsers(filteredUsers.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // ))
    setFirstTimeLoading(true)
    handleFetchRestaurant()
    setFirstTimeLoading(false);
    // const direction =
    //   sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    // setSortColumn(column);
    // setSortDirection(direction);
    // const sortedData = [...displayedUsers].sort((a, b) => {
    //   if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
    //   if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
    //   return 0;
    // });

    // setSortedUsers(sortedData);

  },[currentPage, searchTerm, itemsPerPage])

  if (firsttimeloading){
    return (
      <div className="flex justify-center">
      <PulseLoader
      color="#ffffff"
      loading={firsttimeloading}
      size={10}
      /></div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Restaurant
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
        <DownloadCSVorPDF sortedUsers={sortedUsers} csvHeaders={csvHeaders} tableName={"Restaurant Table"} />
        <div className="flex justify-end mb-2">
          <NavLink to={"/resturantform"}>
            <button className="px-4 py-2 whitespace-nowrap  flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
              <CiCirclePlus size={28} />
              Add Restaurant
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
            {
              sortedUsers.length == 0 ?
              <tr
              aria-colspan={"5"}
              className={`${
                   "bg-gray-50 dark:bg-blue-800 w- justify-center items-center text-center"
              }`}
              > No Restaurants</tr> 
              :
              sortedUsers.map((user, index) => (
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
                    {user.username}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                    {user.email[0].value}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                    {user.phoneNumber[0].value}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                    {user.address}
                  </td>
                  <td className="flex px-4 py-3">
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
              ))
            }
            

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
        {/* Records Per Page */}
        {/* <div className="flex items-center ml-auto">
          <label className="mr-2 text-sm text-gray-800 whitespace-nowrap dark:text-gray-300 w-full">
            Records per page:
          </label>
          <select 
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="px-2 py-1 border rounded">
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div> */}
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
        className="flex justify-between text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full max-h-full mx-auto p-6 border rounded-lg shadow-lg"
      >
        <div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={(e) => handleChange(e, "name")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={editingUser.description}
              onChange={(e) => handleChange(e, "description")}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
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
        </div>
        <div>
          {/* <div>
            <label className="block text-sm font-medium">Working Hours</label>
            {editingUser.workingHours.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "workingHours", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "workingHours", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />

                {last["workingHours"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("workingHours", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("workingHours", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div> */}

          <div>
            <label className="block text-sm font-medium">email</label>
            {editingUser.email.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "email", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="email"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "email", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["email"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("email", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("email", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            {editingUser.phoneNumber.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "phoneNumber", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="phone"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "phoneNumber", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["phoneNumber"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("phoneNumber", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("phoneNumber", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium">website</label>
            {editingUser.website.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "website", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="website"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "website", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["website"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("website", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("website", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium">Social Media</label>
            {editingUser.socialMedia.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "socialMedia", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="socialMedia"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "socialMedia", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["socialMedia"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("socialMedia", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("socialMedia", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium">Cuisine Type</label>
            {editingUser.cuisineType.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleChange(e, "cuisineType", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="cuisineType"
                  name="value"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => handleChange(e, "cuisineType", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["cuisineType"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("cuisineType", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("cuisineType", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>


          <div>
            <label className="block text-sm font-medium">Geo Location</label>
            {editingUser.geoLocation.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  name="lat"
                  placeholder="lat"
                  value={item.key}
                  onChange={(e) => handleChange(e, "geoLocation", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                <input
                  type="cuisineType"
                  name="long"
                  placeholder="long"
                  value={item.value}
                  onChange={(e) => handleChange(e, "geoLocation", index)}
                  className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                />
                {last["cuisineType"] == index ? (
                  <div className="h-[50px] w-[50px] bg-green-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleAddInput("cuisineType", index)}
                      className=" bg-green-500 text-white font-bold m-0 p-0"
                    >
                      <FaPlusCircle size={28} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[50px] w-[50px] bg-red-500 items-center justify-center flex rounded-full mt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteInput("cuisineType", index)}
                      className=" bg-red-500 text-white font-bold m-0 p-0"
                    >
                      <FaMinusCircle size={28} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>{/* */}
      </form>
              
              
              </div>
            
          </div>
        </div>
      )}
    </div>
    
  );
}
