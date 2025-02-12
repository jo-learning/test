import { apiClient } from "../services/apiClient";

export const authRepository = {
  create: async (userData) => {
    try {
      const response = await apiClient.post("/api/user/addUser", userData);
      return response.data;
    } catch (error) {
      // handleApiError(error); // Custom error handler
      return error.response.data
    }
  },
  signin: async (credentials) => {
    try {
      const response = await apiClient.post("/api/user/login", credentials);
      return response.data;
    } catch (error) {
      // handleApiError(error);
      return error.response.data
    }
  },
  getProfile: async () => {
    try {
      const response = await apiClient.get("/auth/profile");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Custom function to handle errors
function handleApiError(error) {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    return {message: error.response.msg}
    // console.error(`API Error: ${error.response.status} - ${error.response.data}`);
    // throw new Error(error.response.data?.message || "An error occurred.");
  } else if (error.request) {
    // No response was received from the server
    console.error("API Error: No response received from the server.");
    throw new Error("No response from server. Please try again later.");
  } else {
    // Something else went wrong while setting up the request
    console.error(`API Error: ${error.message}`);
    throw new Error(error.message || "An unexpected error occurred.");
  }
}
