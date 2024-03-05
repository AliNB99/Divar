import axios from "axios";
import { getNewToken } from "src/services/token";
import { getCookie, setCookie } from "src/utils/cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const newToken = await getNewToken();
      if (!newToken?.response) return;
      setCookie(newToken.response.data);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
