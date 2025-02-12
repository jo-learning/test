// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import FeedbackForm from "./ratingComponent";
import { useParams } from "react-router-dom";
import { apiClient } from "../../data/services/apiClient";
import ProductCard from "./ProductCard";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [review, setReview] = useState([]);

  const handleFetchFood = async () => {
    const res = await apiClient.get(`/api/restaurant/getSingleRestaurant/${id}`);
    const res1 = await apiClient.get(`/api/reviews/fetchRestaurantReview/${id}`);
    setRestaurant(res.data.data);
    console.log(res);
    // console.log(res1);
    setReview(res1.data.data);
  };

  useEffect(() => {
    handleFetchFood();
  }, [id]);

  const ingredients = [
    "Organic Wheat",
    "Natural Flavors",
    "Preservative-Free Oil",
    "Gluten-Free Powder",
    "Vitamin Mix",
  ];

  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-8">
      {/* Product Details */}
      <div className="">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="">
          <div className="h-[130px] rounded-lg">
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            className="w-full md:w-1/2 rounded-lg object-cover shadow-md"
          /></div>
          <h3 className="text-center">{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          </div>
          <div className="bg-white flex-1 dark:bg-gray-800 shadow-lg rounded-xl p-6">
          {
            restaurant.foods && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {restaurant.foods.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
            )
          }
          </div>
          {/* <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {food.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {food.description}
            </p>
            <p className="text-2xl font-semibold text-green-500 mb-6">
              ${food.price}
            </p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ingredients.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-md"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-6 w-6 text-blue-500 rounded focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {ingredient}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Feedback Form */}
      {/* <FeedbackForm foodId={food.id} /> */}

      {/* Reviews Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Reviews
        </h2>
        {review.map((review, index) => (
          <div
            key={index}
            className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 pb-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {review.user.name}
            </h3>
            <p className="text-yellow-500 text-lg mb-2">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
