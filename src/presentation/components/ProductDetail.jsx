import React from "react";

const ProductDetailPage = () => {
  const ingredients = [
    "Organic Wheat",
    "Natural Flavors",
    "Preservative-Free Oil",
    "Gluten-Free Powder",
    "Vitamin Mix",
  ];

  const reviews = [
    { name: "John Doe", rating: 4, comment: "Great quality and taste!" },
    { name: "Jane Smith", rating: 5, comment: "Perfect for my needs." },
    { name: "David Wilson", rating: 3, comment: "Good, but a bit expensive." },
  ];

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* Product Details */}
      <div className="bg-white dark:bg-gray-400 shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Organic Health Mix
            </h1>
            <p className="text-gray-600 mb-4">
              A healthy mix of organic ingredients to boost your health and
              energy levels. Suitable for all ages.
            </p>
            <p className="text-xl font-semibold text-green-600 mb-4">$19.99</p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredients.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <span>{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white dark:bg-gray-400 shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h2>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b last:border-b-0 border-gray-200 pb-4 mb-4"
          >
            <h3 className="font-bold text-gray-800">{review.name}</h3>
            <p className="text-yellow-500 text-sm">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
