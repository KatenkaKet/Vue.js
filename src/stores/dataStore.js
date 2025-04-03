import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore"; // Import authStore

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    corpuses: [],
    corpuses_total: null,
    rooms: [],
    rooms_total: null,
    items: [],
    errorMessageCorpuses: "",
    errorMessageRooms: "",
    loadingCorpuses: false,
    loadingRooms: false,
  }),
  getters: {
    authToken() {
      const authStore = useAuthStore(); // Access authStore
      return authStore.token;
    }
  },
  actions: {
    // --- Corpuses ---
    async get_corpuses(page = 0, per_page = 5) {
      this.errorMessageCorpuses = "";
      this.loadingCorpuses = true;
      try {
        const response = await axios.get(backendUrl + '/corpuses', {
          params: {
            page: page,
            per_page: per_page,
          },
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Use getter to get token
          },
        });
        this.corpuses = response.data;
      } catch (error) {
        this.errorMessageCorpuses = this.handleApiError(error);
        console.error(error);
      } finally {
        this.loadingCorpuses = false;
      }
    },
    async get_corpuses_total() {
      this.errorMessageCorpuses = "";
      try {
        const response = await axios.get(backendUrl + '/corpuses_total', {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Use getter to get token
          },
        });
        this.corpuses_total = Number(response.data);
      } catch (error) {
        this.errorMessageCorpuses = this.handleApiError(error);
        console.error(error);
      }
    },

    // --- Rooms ---
    async get_rooms(page = 0, per_page = 5) {
      this.errorMessageRooms = "";
      this.loadingRooms = true;
      try {
        const response = await axios.get(backendUrl + '/room', {
          params: {
            page: page,
            per_page: per_page,
          },
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Use getter to get token
          },
        });
        this.rooms = response.data;
      } catch (error) {
        this.errorMessageRooms = this.handleApiError(error);
        console.error(error);
      } finally {
        this.loadingRooms = false;
      }
    },
    async get_rooms_total() {
      this.errorMessageRooms = "";
      try {
        const response = await axios.get(backendUrl + '/room_total', {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Use getter to get token
          },
        });
        this.rooms_total = Number(response.data);
      } catch (error) {
        this.errorMessageRooms = this.handleApiError(error);
        console.error(error);
      }
    },

    // --- Helper function for error handling ---
    handleApiError(error) {
      if (error.response) {
        return error.response.data.message || 'An error occurred.';
      } else if (error.request) {
        return 'Network error. Please check your connection.';
      } else {
        return 'An unexpected error occurred.';
      }
    },
  },
});
