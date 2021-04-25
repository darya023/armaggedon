import axios from "axios";

const BASE_URL = `https://api.nasa.gov/neo/rest/v1`;
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
