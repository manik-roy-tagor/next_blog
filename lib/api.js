import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (data) => {
  const res = await axios.post(`${API}login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}register`, data);
  return res.data;
};

export const getBlogs = async (page) => {
  try {
    const response = await axios.get(`${API_URL}blogs.php?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { status: 'error', message: 'Failed to fetch blogs' };
  }
};
