import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});
export default apiClient;
