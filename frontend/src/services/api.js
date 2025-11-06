import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  getTodos: () => api.get('/todos/'),
  getTodo: (id) => api.get(`/todos/${id}`),
  createTodo: (todo) => api.post('/todos/', todo),
  updateTodo: (id, todo) => api.put(`/todos/${id}`, todo),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};

export default api;