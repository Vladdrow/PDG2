import axios from "axios";

export const getVisitorData = async () =>
    await axios.get("http://192.168.250.228:3010/");

export const getVisitor = async () =>
    await axios.get("http://192.168.250.228:3010/login");

// Función para registrar un nuevo usuario
export const register = async (userData) =>
    await axios.post("http://192.168.250.228:3010/register", userData);

// Función para iniciar sesión
export const login = async (credentials) =>
    await axios.post("http://192.168.250.228:3010/login", credentials);
