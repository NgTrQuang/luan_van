import axios from "axios";

const JWT_TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).login?.currentUser?.accessToken || '';
export default axios.create({
  baseURL: "http://localhost:8089/api/v1",
  headers: { Authorization: `Bearer ${JWT_TOKEN}` },
  headers: {
    "Content-type": "application/json"
  }
});