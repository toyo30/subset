import axios from "axios";

// import { getBaseResponse } from "./base-response";
import { BASE_URL } from "../types/constants/constants";

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: undefined,
});

baseApi.interceptors.response.use((response) => {
  const { data, status } = response;
  //   return getBaseResponse(data, status);
  return response;
});
