import axios from 'axios';
export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/',
  withCredentials: true,
});