import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;
if (!baseURL || !/^https?:\/\//.test(baseURL)) {
  throw new Error("Set EXPO_PUBLIC_API_URL to the backend URL");
}
if (!__DEV__ && !baseURL.startsWith("https://")) {
  throw new Error("Production API requests require HTTPS");
}
export const http = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
