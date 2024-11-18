// import React, { useState } from 'react';
// import { BsTrash } from 'react-icons/bs';

// const initialCartItems = [
//   { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150', quantity: 1 },
//   { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150', quantity: 2 },
//   { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150', quantity: 1 },
// ];

// function Cart() {
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [billingAddress, setBillingAddress] = useState({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     phoneNumber: '',
//   });

//   const handleDelete = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setBillingAddress({ ...billingAddress, [name]: value });
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <div className="mt-5 mb-10 sm:mb-0 p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Shopping Cart</h2>


//         {/* Billing Address Form */}
//         <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Billing Address</h3>

//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={billingAddress.name}
//                     onChange={handleAddressChange}
//                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                     placeholder="John"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={billingAddress.email}
//                     onChange={handleAddressChange}
//                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                     placeholder="you@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Address</label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={billingAddress.address}
//                     onChange={handleAddressChange}
//                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                     placeholder="1234 Main St"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={billingAddress.city}
//                     onChange={handleAddressChange}
//                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                     placeholder="City"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
//                   <input
//                     type="number"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={billingAddress.phoneNumber}
//                     onChange={handleAddressChange}
//                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                     placeholder="0900000000"
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
      
//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-600 dark:text-gray-300">Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map(item => (
//             <div key={item.id} className="flex items-center justify-between border-b py-4">
//               <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg shadow-md" />
//               <div className="ml-4 flex-1">
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">${item.price} x {item.quantity}</p>
//               </div>
//               <p className="text-xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
//               <button
//                 onClick={() => handleDelete(item.id)}
//                 className="ml-4 p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-600 rounded-full transition-colors duration-200"
//               >
//                 <BsTrash size={20} />
//               </button>
//             </div>
//           ))}

//           <div className="flex justify-between items-center mt-6">
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white">Total</h3>
//             <p className="text-2xl font-bold text-primary">${total}</p>
//           </div>

        

//           <button className="mt-6 w-full bg-brand-primary text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200">
//             Checkout
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React, { useState, useEffect, useContext } from "react";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import ProductContext from "../utils/ProductContext";
import CounterContext from "../utils/CartCounter";

const Table = () => {
  // Load initial data from localStorage or use default
  const initialData = JSON.parse(localStorage.getItem("tableData")) || [];
  const [data, setData] = useState(initialData);
  const {formData, deleteData} = useContext(ProductContext)
  const {deleteCounter} = useContext(CounterContext)

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  // Handle incrementing quantity
  const handleIncrement = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Handle decrementing quantity
  const handleDecrement = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle deleting a row
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    deleteData(id);
    deleteCounter();
  };

  // Calculate total price
  const calculateTotal = () => {
    return data.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <div className="container mx-auto p-4 text-black dark:text-white">
      <div className="overflow-x-auto sm:ml-[160px] mt-5">
        <table className="table-auto w-full">
          <thead className="bg-gray-800 text-white rounded-lg shadow-lg">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Item</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Total Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="">
                <td className="px-6 py-3">{row.id}</td>
                <td className="px-6 py-3">{row.item}</td>
                <td className="px-6 py-3 flex items-center gap-2">
                  <AiFillMinusCircle
                    size={28}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDecrement(row.id)}
                  />
                  {row.quantity}
                  <AiFillPlusCircle
                    size={28}
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleIncrement(row.id)}
                  />
                </td>
                <td className="px-6 py-3">{row.price}</td>
                <td className="px-6 py-3">{row.quantity * row.price}</td>
                <td className="px-6 py-3">
                  <AiFillDelete
                    size={23}
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(row.id)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td className="px-6 py-3 font-semibold">Total Price</td>
              <td></td>
              <td></td>
              <td className="px-6 py-3 font-semibold">{calculateTotal()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center ml-[160px] mt-5">
          <button className="bg-brand-primary text-white px-6 py-2 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
