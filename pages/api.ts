// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://test.omidrop.africa/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginuser = async (email: string, password: string) => {
  const response = await api.post('login', { email, password });
  return response.data;
};

export const createCustomer = async (data: any, token: string) => {
  const response = await api.post('/customers/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCustomers = async (token: string) => {
  const response = await api.get('/customers/get-customers/1', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
