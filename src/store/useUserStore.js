// store/useUserStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

export const useUserStore = create((set) => ({
  users: [],
  getAllUsers: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/techniciansByAts/${id}`);
      set({ users: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error.response?.data || error.message);
    }
  },
  setUsersNull: () => set({ users: [] }),
}));
