import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
});
export default instance;
