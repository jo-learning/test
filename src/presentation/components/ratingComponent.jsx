// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { apiClient } from "../../data/services/apiClient";

// eslint-disable-next-line no-unused-vars
const FeedbackForm = ({ foodId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hover, setHover] = useState(null); // Hover state for stars
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment && !rating) {
      setError("Please provide either a comment or a rating.");
      return;
    }

    setError(""); // Clear any previous errors

    // Handle form submission logic here
    if (comment && rating) {
      const res = await apiClient.post("/api/reviews/reviewFood", {
        comment,
        rating,
        foodId,
      });

      console.log(res.data);
    } else if (comment) {
      const res = await apiClient.post("/api/reviews/reviewFood", {
        comment,
        foodId,
      });

      console.log(res.data);
    } else {
      const res = await apiClient.post("/api/reviews/reviewFood", {
        rating,
        foodId,
      });

      console.log(res.data);
    }
    console.log("Feedback Submitted:", { comment, rating, foodId });

    // Reset the form
    setComment("");
    setRating(0);
  };

  return (
    <div className="max-w-md mt-10 p-6  ">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Comment Input */}
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-2"
          >
            Comment (Optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Star Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block text-gray-700 font-medium mb-2"
          >
            Rating (Optional)
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${
                  star <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
