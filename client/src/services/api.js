import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Resume API calls
export const getResumes = async () => {
  try {
    const response = await api.get('/resumes');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getResume = async (id) => {
  try {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createResume = async (resumeData) => {
  try {
    const response = await api.post('/resumes', resumeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const saveResume = async (resumeData) => {
  try {
    const response = await api.post('/resumes', resumeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateResume = async (id, resumeData) => {
  try {
    const response = await api.put(`/resumes/${id}`, resumeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteResume = async (id) => {
  try {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;