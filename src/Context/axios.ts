import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";




interface ApiError extends AxiosError<unknown, any> {
  response?: AxiosResponse; // Optional response
}
// Creating an axios instance
const api:AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let accessToken:string|null = null;

// Request interceptor to add the access token to the headers

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (accessToken && config.url !== '/refresh') {
      config.headers = config.headers || {};
      config.headers.set('Authorization', `Bearer ${accessToken}`); // Use set() for AxiosHeaders
    }
    return config;
  },
  (error: ApiError): Promise<never> => Promise.reject(error)
);

// Response Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/refresh");
        accessToken = data.access_token;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        accessToken = null;
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Function to set the access token in memory
export const setAccessToken = (token:string|null):void => {
  accessToken = token;
}

export default api;
