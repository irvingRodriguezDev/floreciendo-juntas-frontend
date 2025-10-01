// src/config/clienteAxios.js
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // en Vite se usa import.meta.env
  headers: {
    "Content-Type": "application/json",
  },
});

export default clienteAxios;
