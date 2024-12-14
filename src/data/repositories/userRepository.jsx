import { apiClient } from "../services/apiClient";

export const userRepository = {
  fetchUser: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },
};
