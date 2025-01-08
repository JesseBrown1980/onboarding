import axios from "axios";
import { handleApiError } from "../lib/errorHandler";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
});

api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleApiError(error);
    return Promise.reject(errorMessage);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (credentials) => api.post("/auth/register", credentials),
  logout: () => api.delete("/auth/logout"),
  getCurrentUser: () => api.get("/auth/user"),
};

export const onboardingAPI = {
  getSteps: () => api.get("/api/onboarding"),
  submitOnboarding: (data) => api.post("/api/onboarding", data),
};
