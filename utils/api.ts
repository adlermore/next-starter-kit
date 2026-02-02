// src/utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APIURL } from "./constants";

// Create Axios instance
const apiClient = axios.create({
  baseURL: APIURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Generic API methods with TypeScript types
const api = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  },
};

export default api;
