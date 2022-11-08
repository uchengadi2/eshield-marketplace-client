import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9000/api/v1", // for development
  baseURL: "https://api.eshieldafrica.com/api/v1", // for production
});
