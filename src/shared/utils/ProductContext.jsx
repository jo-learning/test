import React, { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedData = localStorage.getItem("tableData");
    // console.log(savedData);
    // const initialData = savedData || [];
    // setFormData(initialData);
  }, []);

  const addData = (data) => {
    if (formData.length > 0) {
      const check = formData.some((obj) => obj.id != data.id)
      if (check) {
        
        setFormData((prevData) =>{
          localStorage.setItem("tableData", JSON.stringify([...prevData, {foodId: data.id ,restaurantId: data.restaurant.id , id: data.id, item: data.name, price: data.price, quantity: 1 } ]));
          return [...prevData, { foodId: data.id, restaurantId: data.restaurant.id , id: data.id, item:data.name, price: data.price, quantity: 1 }]
        }
        );
        
      }
    } else {
      setFormData([{foodId: data.id ,restaurantId: data.restaurant.id , id: data.id,item: data.name, price: data.price, quantity: 1 }]);
      localStorage.setItem("tableData", JSON.stringify([{foodId: data.id ,restaurantId: data.restaurant.id , id: data.id, item:data.name, price: data.price, quantity: 1 }]));
    }
    // console.log(data)
  };
  const deleteData = (id)=>{
    setFormData((prevData) => prevData.filter((item) => item.id !== id));
  }

  return (
    <ProductContext.Provider value={{ formData, addData, deleteData }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
