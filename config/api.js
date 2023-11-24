import axios from "axios";

const api = axios.create({
  baseURL: 'https://app-vax.azurewebsites.net',
})

export default api;