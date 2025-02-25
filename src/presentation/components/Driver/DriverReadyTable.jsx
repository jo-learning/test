import React, { useContext, useEffect, useState } from "react";
import { apiClient } from "../../../data/services/apiClient";
import UserContext from "../../../shared/utils/UserContext";
import OrderDetailsModal from "./ui/OrderDetailsModal"; // Import the modal component
import { toast } from "react-toastify";



export default function RestaurantFoodTable() {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 3;

  const fetchPreparedOrder = async () => {
    const response = await apiClient.get(`/api/order/fetchPreparedOrders`);
    setOrders(response.data.data);
  };

  useEffect(() => {
    fetchPreparedOrder();
  }, []);
  const handlePick = async(order) => {
    try{
      setLoading(true);
      const res = await apiClient.patch(`/api/order/changeOrderToOnDelivery/${order.id}/${user[0].id}`)
    console.log(res)
    fetchPreparedOrder();

    }catch{
      toast.error("something error")

    }finally{
      setLoading(false);
    }
    
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleDetailClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredUsers = orders.filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Ready table
      </h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-gray-800 bg-white border rounded-md dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 mr-4"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                User Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                User Address
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((order, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.user.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.user.address}
                </td>
                <td className="flex px-4 py-3">
                  <button
                  onClick={() => handlePick(order)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  disabled={loading}
                  >
                    {loading ? "loading" :"Pick"}
                  </button>
                  <button
                    onClick={() => handleDetailClick(order)}
                    className="px-3 py-1 ml-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Detail
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

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}