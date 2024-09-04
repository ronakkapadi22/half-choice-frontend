import axios from "axios";
import { getDataFromLocal } from "../assets/utils/local";
import { PAGES } from "../assets/utils/urls";
import { ERROR_MESSAGES, METHODS } from "../assets/utils/constant";

const BASE_URL = "http://api.halfchoice.in:3306/api/v1";

const axiosConfig = {
    baseURL: BASE_URL,
    withCredentials: true,
};

// Create a single Axios instance
const axiosInstance = axios.create(axiosConfig);

// Set up request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = getDataFromLocal('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*'
    return config;
});

// Set up response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
  
      if (!response) return Promise.reject(error);
  
      const { status } = response;
  
      const errorMessage = ERROR_MESSAGES.common;
  
      let customError = {
        message: errorMessage,
        ...response,
      };
  
      if (ERROR_MESSAGES[status]) {
        customError.message = ERROR_MESSAGES[status];
      }
  
      if ([401, 403].includes(status)) {
        localStorage.clear();
        window.location.href = PAGES.LOGIN.path;
        return Promise.reject(customError);
      }
  
      return Promise.reject(customError);
    }
  );

const client = ({ method = METHODS.GET, url, data, ...rest }) => {
    return axiosInstance({
      method,
      url,
      data,
      withCredentials: false,
      ...rest,
    });
  };
  
export default client;