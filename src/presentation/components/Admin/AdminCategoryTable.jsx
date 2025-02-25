import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import DownloadCSVorPDF from "../lib/download";
import RecordsPerPage from "../lib/recordsPerPage";

import { categoryRepository } from "../../../data/repositories/categoryRepository";
import { getCategoryData, createCategoryData } from "../../../domain/useCases/getCategoryData";
import { toast } from "react-toastify";
import { apiClient } from "../../../data/services/apiClient";
import useDebounce from "../lib/debounceSearch";

export default function AdminCategoryTable() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] =useState( [])
  const [id , setId] = useState('');

  const [users, setUsers] = useState(allUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setId(user.id);
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [category, setCategory] = useState(null)

  const handleOnChange = (e) =>{
      setCategory(e.target.value)
      console.log(category);
  }
  const handleSubmit = async() => {
    setLoading(true)
    const data = await createCategoryData({name: category}, categoryRepository);
    console.log(data, category)
    setLoading(false)
    if (data.success){
    setSortedUsers([...sortedUsers, data.data])
    setAddCategory(false)
    toast.success(data.msg)}else{
      toast.error("try again")
    }
  } 

  const handleUpdate = async() => {
    const data = await apiClient.put(`/api/category/updateCategory/${id}`, {name:editingUser.name});
    console.log(data);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    alert("Item added!");
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
    const response = await apiClient.get(`/api/category/fetchCategories?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc&search=${debouncedSearchQuery}`)
    console.log(response)
    let user = response.data.data;
    setSortedUsers(user);
    // setTotalPages(response.data.pagination.total)
      }
      handleSearch()




    }
  }, [debouncedSearchQuery]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3)
  // const itemsPerPage = 3;

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      // user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedUsers, setSortedUsers] = useState(
    filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );

  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    // Sort the users array
    const sortedData = [...displayedUsers].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedUsers(sortedData);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };


  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Category Name", key: "categoryName" },
  ];


  useEffect(()=>{
    const column = "id"
    // setSortedUsers(filteredUsers.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // ))
    // let datas = []
    const handleCategory = async() => {
      const data = await getCategoryData(categoryRepository)
      if (data.success == true) 
        setAllUsers(data.data)
      const filteredUsers = data.data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // return filteredUsers

      const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      const direction =
        sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
      setSortColumn(column);
      setSortDirection(direction);
      const sortedData = [...displayedUsers].sort((a, b) => {
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        return 0;
      });

  
      setSortedUsers(sortedData);
      
      
    } ;
    handleCategory()

    // console.log(datas)
    
  
    // const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    

  },[currentPage, searchTerm, itemsPerPage])



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
        <DownloadCSVorPDF sortedUsers={sortedUsers} csvHeaders={csvHeaders} tableName={"Restaurant Table"} />
        <div className="flex justify-end mb-2">
      <button 
      onClick={()=>{setAddCategory(true)}}
      className="px-4 py-2 mt-2 whitespace-nowrap  flex justify-center text-center items-center  text-sm text-white bg-blue-600 rounded hover:bg-green-700">
        <CiCirclePlus size={28}/>
          Add Category
        </button></div>
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
                <td className="px-4 py-3">
                  <button 
                  onClick={()=>{handleEditClick(user)}}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button 
                  onClick={()=>{toggleModal()}}
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

{addCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleModal} // Close the modal when clicking outside
        >
          {/* Modal Content */}
          <div
            className="bg-gray-600 rounded-lg shadow-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <label>Category Name</label>
            <input
            type="text"
            className="w-full text-black px-4 py-2 mt-2 border rounded-lg bg-white"
            onChange={handleOnChange}
            >
            </input>
            <div className="flex justify-between mt-4">
              <button
                onClick={()=> {setAddCategory(false)}}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="ml-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "loading ..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingUser && (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={()=> setIsEditModalOpen(false)} // Close the modal when clicking outside
      >
        {/* Modal Content */}
        <div
          className="bg-gray-600 rounded-lg shadow-lg p-6 w-96"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <label>Category Name</label>
          <input
          type="text"
          value={editingUser.name}
          className="w-full text-black px-4 py-2 mt-2 border rounded-lg bg-white"
          onChange={(e)=> setEditingUser({...editingUser, name: e.target.value})}
          >
          </input>
          <div className="flex justify-between mt-4">
            <button
              onClick={()=> setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="ml-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "loading ..." : "Add Category"}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}






// import { useState, useEffect } from "react";
// import { CiCirclePlus } from "react-icons/ci";
// import DownloadCSVorPDF from "../lib/download";
// import RecordsPerPage from "../lib/recordsPerPage";

// export default function AdminCategoryTable() {
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [sortColumn, setSortColumn] = useState("id");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3010/api/driver/fetchDrivers?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortColumn}&sortOrder=${sortDirection}&search=${searchTerm}`
//         // `http://localhost:3010/api/category/fetchCategories?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortColumn}&sortOrder=${sortDirection}&search=${searchTerm}`
//       );
//       const data = await response.json();
//       setCategories(data.items || []);
//       setTotalPages(data.totalPages || 0);
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [currentPage, itemsPerPage, sortColumn, sortDirection, searchTerm]);

//   const handleSort = (column) => {
//     const direction = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortDirection(direction);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   const handleEditClick = (category) => {
//     setEditingCategory(category);
//     setIsEditModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingCategory((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = () => {
//     setCategories((prevCategories) =>
//       prevCategories.map((cat) =>
//         cat.id === editingCategory.id ? editingCategory : cat
//       )
//     );
//     setIsEditModalOpen(false);
//   };

//   const handleEditCancel = () => {
//     setEditingCategory(null);
//     setIsEditModalOpen(false);
//   };

//   const csvHeaders = [
//     { label: "ID", key: "id" },
//     { label: "Category Name", key: "name" },
//   ];

//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Category</h1>

//       {/* Search Bar and Add Category Button */}
//       <div className="mb-4 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="w-full px-4 py-2 text-gray-800 bg-white border rounded-md dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 mr-4"
//         />
//         <DownloadCSVorPDF
//           sortedUsers={categories}
//           csvHeaders={csvHeaders}
//           tableName={"Category Table"}
//         />
//         <button
//           onClick={() => alert("Add Category")}
//           className="px-4 py-2 mt-2 whitespace-nowrap flex justify-center text-center items-center text-sm text-white bg-blue-600 rounded hover:bg-green-700"
//         >
//           <CiCirclePlus size={28} />
//           Add Category
//         </button>
//       </div>

//       {/* Categories Table */}
//       <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-200 dark:bg-gray-700">
//             <tr>
//               {csvHeaders.map((column) => (
//                 <th
//                   key={column.key}
//                   className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
//                   onClick={() => handleSort(column.key)}
//                 >
//                   <div className="flex items-center">
//                     {column.label}
//                     {sortColumn === column.key && (
//                       <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
//                     )}
//                   </div>
//                 </th>
//               ))}
//               <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, index) => (
//               <tr
//                 key={index}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
//                 }`}
//               >
//                 <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">{category.id}</td>
//                 <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">{category.name}</td>
//                 <td className="px-4 py-3">
//                   <button
//                     onClick={() => handleEditClick(category)}
//                     className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => alert("Delete Category")}
//                     className="ml-2 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-4">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className={`px-3 py-1 text-sm ${
//             currentPage === 1
//               ? "text-gray-400 bg-gray-200 cursor-not-allowed"
//               : "text-white bg-blue-600 hover:bg-blue-700"
//           } rounded`}
//         >
//           &lt;
//         </button>
//         <span className="mx-2 text-gray-800 dark:text-gray-300">
//           {currentPage} / {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className={`px-3 py-1 text-sm ${
//             currentPage === totalPages
//               ? "text-gray-400 bg-gray-200 cursor-not-allowed"
//               : "text-white bg-blue-600 hover:bg-blue-700"
//           } rounded`}
//         >
//           &gt;
//         </button>
//         <RecordsPerPage setItemsPerPage={setItemsPerPage} />
//       </div>
//     </div>
//   );
// }
