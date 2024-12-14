import React from "react";

const Dashboard = () => {
  const data = {
    totalOrders: 1200,
    totalDeliveries: 950,
    pendingOrders: 250,
    revenue: "45,000 ETB",
    totalRestaurant: 2640
  };

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Orders */}
        <div className="flex justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-orange-500 text-center">todo</div>
          <div className="ml-4">
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalOrders}
          </p>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Orders
          </h2>
          
          </div></div>
        </div>

        {/* Total Deliveries */}
        <div className="flex justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-orange-500 text-center">todo</div>
          <div className="ml-4">
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalDeliveries}
          </p>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Deliveries
          </h2>
          
          </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="flex justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-orange-500 text-center">todo</div>
          <div className="ml-4">
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.pendingOrders}
          </p>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Pending Orders
          </h2>
          
          </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-orange-500 text-center">todo</div>
          <div className="ml-4">
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.revenue}
          </p>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Revenue
          </h2>
          
          </div>
          </div>
        </div>

        {/* Total Restaurant */}

        <div className="flex justify-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-orange-500 text-center">todo</div>
          <div className="ml-4">
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalRestaurant}
          </p>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Restaurant
          </h2>
          
          </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;
