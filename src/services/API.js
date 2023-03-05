import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default instance;
