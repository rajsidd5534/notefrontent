import axios from "axios";

const BASE ="notebackend-production-49e6.up.railway.app";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// NOTE: backend may return id as `id` or `_id`. Code maps both in pages.
export const NotesAPI = {
  list: () => api.get("/api/notes").then(r => r.data),
  get: (id) => api.get(`/api/notes/${id}`).then(r => r.data),
  create: (payload) => api.post("/api/notes", payload).then(r => r.data),
  update: (id, payload) => api.put(`/api/notes/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/api/notes/${id}`).then(r => r.data),
  share: (id) => api.post(`/api/notes/${id}/share`).then(r => r.data),
  unshare: (id) => api.post(`/api/notes/${id}/unshare`).then(r => r.data),
  getPublic: (id) => api.get(`/api/notes/${id}/public`).then(r => r.data)
};

