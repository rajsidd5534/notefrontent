import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "notebackend-production-a660.up.railway.app";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// NOTE: backend may return id as `id` or `_id`. Code maps both in pages.
export const NotesAPI = {
  list: () => api.get("/notes").then(r => r.data),
  get: (id) => api.get(`/notes/${id}`).then(r => r.data),
  create: (payload) => api.post("/notes", payload).then(r => r.data),
  update: (id, payload) => api.put(`/notes/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/notes/${id}`).then(r => r.data),
  share: (id) => api.post(`/notes/${id}/share`).then(r => r.data),
  unshare: (id) => api.post(`/notes/${id}/unshare`).then(r => r.data),
  getPublic: (id) => api.get(`/notes/${id}/public`).then(r => r.data)
};
