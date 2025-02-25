import { useEffect, useState, useContext } from "react";
import { apiClient } from "../../../data/services/apiClient";
import UserContext from "../../../shared/utils/UserContext";
import { FiFileText } from "react-icons/fi";

export default function OrdersSummaryTable() {
  const { user } = useContext(UserContext);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [allorders, setallorders] = useState([]);
  const [names, setName] = useState([]);
  const [allOrders, setAllOrders] = useState([
    {
      orderId: "ORD12345",
      itemName: "Wireless Headphones",
      customerName: "John Doe",
      quantity: 2,
      price: 50,
      totalPrice: 100,
      status: "Accepted",
    },
    {
      orderId: "ORD67890",
      itemName: "Bluetooth Speaker",
      customerName: "Jane Smith",
      quantity: 1,
      price: 30,
      totalPrice: 30,
      status: "Pending",
    },
    {
      orderId: "ORD54321",
      itemName: "Smart Watch",
      customerName: "Alice Johnson",
      quantity: 3,
      price: 80,
      totalPrice: 240,
      status: "Canceled",
    },
    {
      orderId: "ORD98765",
      itemName: "Laptop",
      customerName: "Bob Brown",
      quantity: 1,
      price: 700,
      totalPrice: 700,
      status: "Pending",
    },
    {
      orderId: "ORD24680",
      itemName: "Tablet",
      customerName: "Cathy White",
      quantity: 1,
      price: 200,
      totalPrice: 200,
      status: "Accepted",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleOpenModal = async(order) => {
    setSelectedOrder(order);
    if (order.orderFoods.length !== 0){
      let name = []
      console.log(order.orderFoods)
      for (let i = 0; i < order.orderFoods.length; i++){
    const result = await apiClient.get(`/api/food//getSingleFood/${order.orderFoods[i].foodId}`)
console.log(result);
name.push(result.data.data.name);
      }
      setName(name);
    // const result = await apiClient.get(`/api/food//getSingleFood/${order.orderFoods.foodId}`)
    // console.log(result);
    }
    setIsModalOpen(true);
  };

  const filteredOrders = allOrders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleApprove = async (orderId) => {
    const response = await apiClient.patch(
      `/api/order/changeOrderToPrepared/${orderId}`
    );
    console.log(response);
    const updatedOrders = allorders.map((order) =>
      order.id === orderId ? { ...order, status: "Accepted" } : order
    );
    setallorders(updatedOrders);
  };

  const handleDecline = (orderId) => {
    const updatedOrders = allOrders.map((order) =>
      order.orderId === orderId ? { ...order, status: "Canceled" } : order
    );
    setAllOrders(updatedOrders);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      console.log(user);
      const response = await apiClient.get(
        `/api/order/fetchOrderOfARestaurant`
      );
      // const data = await response.json();
      console.log(response);
      setallorders(response.data.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Orders
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-gray-800 bg-white border rounded-md dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Order ID
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Item Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Customer Name
              </th>
              {/* <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Price
              </th> */}

              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Items
              </th>

              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {allorders.map((order, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {/* {order.orderId} */}
                  {order.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.itemName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {/* {order.customerName} */}
                  {order.user.name}
                </td>
                {/* <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.quantity}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.price} ETB
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.totalPrice} ETB
                </td> */}

                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                  {order.orderFoods.length}
                </td>

                <td
                  className={`px-4 py-3 text-sm font-medium ${
                    order.status === "pending"
                      ? "text-yellow-500"
                      : order.status == "canceled"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-3">
                  {order.status == "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleApprove(order.id);
                        }}
                        className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleDecline(order.orderId);
                        }}
                        className="ml-2 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Decline
                      </button>
                     
                    </>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                        <button onClick={() => handleOpenModal(order)}>
                          <FiFileText className="w-5 h-5 text-blue-600 hover:text-blue-700" />
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

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
              Order Details - {selectedOrder.id}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Customer: {selectedOrder.user.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Status: {selectedOrder.status}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Total Items: {selectedOrder.orderFoods.length}
            </p>
            <ul className="mt-2">
              {selectedOrder.orderFoods.map((food, idx) => (
                <li key={idx} className="text-gray-600 dark:text-gray-400">
                  <p className="text-blue-600">Name: {names[idx]}</p>
                  {food.name} - {food.quantity}x  {food.totalPrice} ETB 
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
