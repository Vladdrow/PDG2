import axios from "axios";

const BASE_URL = "http://192.168.250.228:3010";

/* export const getVisitorData = async () => await axios.get(`${BASE_URL}/`); */

export const getHomePageData = async () => await axios.get(`${BASE_URL}/`);

export const getVisitor = async () => await axios.get(`${BASE_URL}/login`);

// Función para registrar un nuevo usuario
export const register = async (userData) =>
    await axios.post(`${BASE_URL}/register`, userData);

// Función para iniciar sesión
export const login = async (credentials) =>
    await axios.post(`${BASE_URL}/login`, credentials);
