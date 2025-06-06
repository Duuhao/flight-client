import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 搜索航班API
export const searchFlights = async (departureCode, destinationCode, date) => {
  try {
    const response = await http.get('/flights/search', {
      params: { 
        departure: departureCode,
        arrival: destinationCode,
        date: new Date(date).toISOString().split('T')[0]
      }
    });
    return response;
  } catch (error) {
    console.error('Flight search failed:', error);
    throw error;
  }
};

// 获取用户信息API
export const getUserInfo = async () => {
  try {
    const response = await http.get('/auth/user-info');
    return response;
  } catch (error) {
    console.error('Failed to get user info:', error);
    throw error;
  }
};

export default {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  searchFlights,
  getUserInfo
};
