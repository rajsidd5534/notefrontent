import axios from "axios";

// Get backend URL from environment variable
const BASE = "https://notebackend-production-49e6.up.railway.app" // Ensure no quotes in .env

// Create Axios instance
const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // optional: 10s timeout
});

// Helper function for error handling
const handleError = (error) => {
  if (error.response) {
    // Backend responded with status code out of 2xx
    console.error("API Error:", error.response.status, error.response.data);
    throw error.response.data || new Error("API Error");
  } else if (error.request) {
    // Request made but no response
    console.error("No response from server:", error.request);
    throw new Error("No response from server");
  } else {
    console.error("Error setting up request:", error.message);
    throw new Error(error.message);
  }
};

// Notes API
export const NotesAPI = {
  list: async () => {
    try {
      const res = await api.get("/api/notes");
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  get: async (id) => {
    try {
      const res = await api.get(`/api/notes/${id}`);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  create: async (payload) => {
    try {
      const res = await api.post("/api/notes", payload);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  update: async (id, payload) => {
    try {
      const res = await api.put(`/api/notes/${id}`, payload);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  remove: async (id) => {
    try {
      const res = await api.delete(`/api/notes/${id}`);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  share: async (id) => {
    try {
      const res = await api.post(`/api/notes/${id}/share`);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  unshare: async (id) => {
    try {
      const res = await api.post(`/api/notes/${id}/unshare`);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  getPublic: async (id) => {
    try {
      const res = await api.get(`/api/notes/${id}/public`);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },
};
