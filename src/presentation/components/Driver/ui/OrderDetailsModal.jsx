import React from "react";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Order Details
        </h2>
        <div className="space-y-4">
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>User Name:</strong> {order.user.name}
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>User Address:</strong> {order.user.address}
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Ordered Foods:
            </h3>
            <ul className="mt-2 space-y-2">
              {order.orderFoods.map((food) => (
                <li
                  key={food.id}
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>Food ID:</strong> {food.foodId}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>Total Price:</strong> {food.totalPrice}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
