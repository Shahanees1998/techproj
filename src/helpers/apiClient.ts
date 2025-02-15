import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookieServerSide } from "./serverHelpers";


// Axios request interceptor
const axiosRequestInterceptor = {
  onFulfilled: async (config: InternalAxiosRequestConfig) => {
    const token = await getCookieServerSide("token");
    // Add token to header
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  onRejected: (error: AxiosError) => {
    console.error("Request interceptor error", error);
    return Promise.reject(error);
  },
};

// Axios response interceptor
const axiosResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: async (error: AxiosError) => {
    return Promise.reject(error);
  },
};

// Create an Axios instance
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors to the Axios instance
API.interceptors.request.use(
  axiosRequestInterceptor.onFulfilled,
  axiosRequestInterceptor.onRejected
);
API.interceptors.response.use(
  axiosResponseInterceptor.onFulfilled,
  axiosResponseInterceptor.onRejected
);

export default API;
