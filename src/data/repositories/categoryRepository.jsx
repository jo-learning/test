import { apiClient } from "../services/apiClient";

export const categoryRepository = {
  allCategory: async () => {
    try {
      const response = await apiClient.get("/api/category/fetchAllCategories");
      return response.data;
    } catch (error) {
      // handleApiError(error); // Custom error handler
      return error.response.data
    }
  },
  Create: async (userData) => {
    try {
      const response = await apiClient.post("/api/category/addCategory", userData)
      return response.data
    } catch (error){
      return error.response.data
    }
  }
};

