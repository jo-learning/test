import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

const restaurant = [
  {
    id: 1,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 19.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 2,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 29.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 3,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 39.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 4,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 49.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 5,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 59.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 6,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 7,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 8,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 9,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 10,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs0",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  {
    id: 11,
    description:
      "Welcome to Habeshan Restaurant, your destination for an unforgettable culinary journey. Rooted in the rich traditions of Ethiopian cuisine, we proudly offer an authentic selection of Habesha favorites, inclu-ding flavorful injera, spicy doro wat, and aromatic tibs1",
    cuisineType: ["italian", "spanish", "Habesha"],
    price: 69.99,
    image: "https://via.placeholder.com/150",
    restaurant_name: "Shege",
  },
  // More products...
];

function Restaurant() {
  return (
    <div className="mx-[140px] my-8">
      {restaurant.map((product, index) => (
        <div key={index} className="dark:bg-gray-800 shadow-lg rounded-lg mt-4">
          <NavLink to={"/detail"} className={"text-black hover:text-black "}>
            <div className="flex">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[600px] h-[200px]"
                />
              </div>
              <div className="flex-grow-0">
                <div className="flex items-center">
               
                <h3 className="text-xl mt-4 font-bold px-4">{product.restaurant_name}</h3>  <span className="flex px-4 mt-4 text-yellow-500"><IoIosStar /> <IoIosStar /> <IoIosStar /> <IoIosStarHalf /></span></div>
                <p className="font-light  px-9 flex space-x-5">
                  {product.cuisineType.map((cuisine, index) => (
                    <div key={index} className="hover:bg-gray-200 p-2">
                        {cuisine}
                    </div>
                  ))}
                </p>
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
