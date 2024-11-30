import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const clientAPI: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpClientRequest = ({ ...options }) => {
  const token = Cookies.get("access_token");
  clientAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response: any) => response;
  const onError = (err: any) => err;
  return clientAPI(options).then(onSuccess).catch(onError);
};
