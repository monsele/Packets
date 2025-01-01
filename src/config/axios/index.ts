import axios from "axios";

export const api = axios.create({
  baseURL: "https://paymaster-app.fly.dev/api", // Use environment variable for base URL
  //   timeout: 5000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});
export const offchainApi = axios.create({
  baseURL: "https://on-real.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});
