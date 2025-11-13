import axios from 'axios';

const api = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export function setAuthToken(token: string | null) {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'];
}


export default api;