import { NavLink } from "react-router-dom";
// import ProductCard from "./ProductCard";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { useState, useEffect } from "react";
import { apiClient } from "../../data/services/apiClient";
import { API_URL } from "./lib/constant";

const restaurant = [
  {
    id: 1,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 19.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 2,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 29.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 3,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 39.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 4,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 49.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 5,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 59.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 6,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 7,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 8,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 9,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 10,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs0",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  {
    id: 11,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs1",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    name: "Shege",
  },
  // More products...
];

function Restaurant() {
  const [restaurants, setRestaurants] = useState(restaurant)
  const [imageUrl, setImageUrl] = useState([])
  const handleFetchRestaurant = async()=>{
    const currentPage = 1
    const itemsPerPage = 4
    const response = await apiClient.get(`/api/restaurant/fetchRestaurants?page=${currentPage}&limit=${itemsPerPage}&sortBy=id&sortOrder=asc`)
    
    const res = response.data.data.map(res => res.ambiance.replace('public/uploads/', '/uploads/'))
    console.log(res)
    setRestaurants(response.data.data)
    setImageUrl(res)
    // setSortedUsers(response.data.data);
    // setTotalPages(response.data.pagination.total)
  }

  function isValidJson(data) {
    try {
      JSON.parse(data);
      return true; // It's valid JSON
    } catch (error) {
      return false; // It's not valid JSON
    }}
  useEffect(()=> {
    handleFetchRestaurant()
  },[])
  return (
    <div className="mx-[140px] my-8">
      {restaurants.map((product, index) => (
        <div key={index} className="dark:bg-gray-800 shadow-lg rounded-lg mt-4">
          <NavLink to={`/restaurantdetail/${product.id}`} className={"text-black hover:text-black "}>
            <div className="flex">
              {/* <div> */}
                <img
                  src="https://via.placeholder.com/400"
                  alt={product.name}
                  className="w-[200px] h-[200px]"
                />
              {/* </div> */}
              <div className="flex-grow-0">
                <div className="flex items-center">
               
                <h3 className="text-xl mt-4 font-bold px-4">{product.name}</h3>  <span className="flex px-4 mt-4 text-yellow-500"><IoIosStar /> <IoIosStar /> <IoIosStar /> <IoIosStarHalf /></span></div>
                
                  {product.cuisineType.map((cuisine, index) => {
                    const isValid = isValidJson(cuisine);
                    if (isValid){
                    const cu = JSON.parse(cuisine);
                   return ( <p key={index} className="font-light  px-9 flex space-x-5">
                      {
                    cu.map((cus)=>(
                      <div key={index} className="hover:bg-gray-200 p-2">
                        {cus.value}
                    </div>
                    ))}
                    </p>)}else{
                      return(<></>)
                    }
                   
                    
})}
                
                <p className="font-light text-[16px] px-4 ">
                  {product.description}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Restaurant;
