import { useState,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import DownloadCSVorPDF from "../lib/download";
import RecordsPerPage from "../lib/recordsPerPage";
import { apiClient } from "../../../data/services/apiClient";
import useDebounce from "../lib/debounceSearch";

export default function AdminVehicelTable() {
  const allUsers = [
  ];


  // const [users, setUsers] = useState(allUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [drivers, setDrivers] = useState([])
  

  const handleEditClick = (user) => {
    console.log(user)
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
    const response = await apiClient.get(`/api/vehicle/fetchVehicles?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc&search=${debouncedSearchQuery}`)
    console.log(response)
    let user = response.data.data;
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

  const  [totalPages, setTotalPages] = useState(0)
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

    const response = await apiClient.get(`/api/vehicle/fetchVehicles?page=${currentPage}&limit=${itemsPerPage}&sortBy=${column}&sortOrder=${direction}`)
    let user = response.data.data;
    

    setSortedUsers(user);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
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


  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(editingUser);
    // eslint-disable-next-line no-unused-vars
    let user = [editingUser].map(({driver, ...rest})=> rest)
    user[0].currentLocation = JSON.stringify(user[0].currentLocation)
    user[0].insurance = JSON.stringify(user[0].insurance)
    // let user = {
    //   id: editingUser.id,
    //   driver: editingUser.driver,
    //   license: editingUser.license,
    //   plateNumber: editingUser.plateNumber,
    //   vehicleModel: editingUser.vehicleModel,
    //   vehicleType: editingUser.vehicleType,
    //   workingHours: editingUser.workingHours,
    //   insurance: editingUser.insurance,
    //   // driver: editingUser.driver
    // }
    console.log(user)

    const res = await apiClient.put(`/api/vehicle/updateVehicle/${editingUser.id}`, user[0])
    console.log(res)
  }

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Driver Name", key: "driverName" },
    { label: "Vehicle Type", key: "vehicleType" },
    { label: "Vehicle Model", key: "vehicleModel" },
    { label: "License", key: "license" },
    { label: "Plate Number", key: "plateNumber" },
    { label: "Phone", key: "phoneNumber" },
  ];

  const handleFetchVehicel = async()=>{
    const response = await apiClient.get(`/api/vehicle/fetchVehicles?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`)
    console.log(response)
    setSortedUsers(response.data.data);
    setTotalPages(response.data.pagination.total)
    const res = await apiClient.get("/api/driver/fetchDrivers?page=1&limit=8&sortBy=id&sortOrder=asc")
      if (res.data.success == true){
        // console.log(res.data.data)
        // const a= res.data.data
        setDrivers(res.data.data)
  }}

  useEffect(()=>{
    // const column = "id"
    // setSortedUsers(filteredUsers.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // ))
    handleFetchVehicel()
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


  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Vehicle
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
        <DownloadCSVorPDF sortedUsers={sortedUsers} csvHeaders={csvHeaders} tableName={"Vehicle Table"} />
        <div className="flex justify-end mb-2">
        <NavLink to={'/vehicleform'}>
      <button className="px-4 py-2 whitespace-nowrap  flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
        <CiCirclePlus size={28}/>
          Add Vehicle
        </button></NavLink></div>
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
                  {user.driver.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.vehicleType}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.vehicleModel}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.license}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.plateNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {user.driver.phoneNumber}
                </td>
                <td className="px-4 py-3">
                  <button 
                  onClick={()=>{handleEditClick(user)}}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button 
                  onClick={toggleModal}
                  className="ml-2 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
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
          <div className=" fixed inset-0 z-50 flex  justify-center bg-black bg-opacity-50 overflow-y-scroll ">
          <div
            className="mt-20 bg-gray-600 rounded-lg shadow-lg p-6 w-[700px] overflow-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-white">Edit Food</h2>
            <button onClick={()=>setIsEditModalOpen(false)}>X</button></div>
            <div className="mt-4">
          <form onSubmit={handleSubmit} className="flex justify-between text-black dark:text-gray-400 space-y-4 space-x-4  max-w-full mx-auto p-6 border rounded-lg shadow-lg">
              
              <div>
              <div>
                  <label className="block text-sm font-medium">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={editingUser.vehicleType}
                    onChange={(e) => handleChange(e, "vehicleType")}
                    className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>
      
                <div>
                  <label className="block text-sm font-medium">Vehicle Type</label>
                  <select
                    name="driverId"
                    value={editingUser.driverId}
                    onChange={(e) => handleChange(e, "driverId")}
                    className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    {drivers.map((driver, index)=>(
                      <option key={index} value={driver.id}>{driver.name}</option>
                    ))}
                  </select>
                </div>
            
            <div>
              <label className="block text-sm font-medium">Vehicle Model</label>
              <input
                type="text"
                name="vehicleModel"
                value={editingUser.vehicleModel}
                onChange={(e) => handleChange(e, 'vehicleModel')}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">License</label>
              <input
                type="text"
                name="license"
                value={editingUser.license}
                onChange={(e) => handleChange(e, 'license')}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div>
            
           
            
            </div>
            <div>
            <div>
              <label className="block text-sm font-medium">Plate Number</label>
              <input
                type="text"
                name="plateNumber"
                value={editingUser.plateNumber}
                onChange={(e) => handleChange(e, 'plateNumber')}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Working Hour</label>
              <input
                type="text"
                name="workingHours"
                value={editingUser.workingHours}
                onChange={(e) => handleChange(e, 'workingHours')}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Insurance </label>
              {editingUser.insurance.map((item, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    name="key"
                    placeholder="Key"
                    value={item.key}
                    onChange={(e) => handleChange(e, 'insurance', index)}
                    className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => handleChange(e, 'insurance', index)}
                    className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                  />
                  
                </div>
              ))}
              
            </div>
      
      
            {/* Repeat similar blocks for Phone, Ambiance, Website, Social Media, Cuisine Type, Address */}
      
            <div>
              <label className="block text-sm font-medium">Current Location </label>
              {editingUser.currentLocation.map((item, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    name="long"
                    placeholder="Longitude"
                    value={item.long}
                    onChange={(e) => handleChange(e, 'currentLocation', index)}
                    className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    name="lat"
                    placeholder="Latitude"
                    value={item.lat}
                    onChange={(e) => handleChange(e, 'currentLocation', index)}
                    className="w-1/2 px-4 py-2 mt-2 border rounded-lg bg-white"
                  />
                  
                </div>
              ))}
              
            </div>
      
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg">
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