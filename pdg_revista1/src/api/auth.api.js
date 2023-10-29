import axios from "axios";
import config from "../../config";

const myIp = config.ipAddress;

const BASE_URL = `http://${myIp}:3010`;
export const getVisitor = async () => await axios.get(`${BASE_URL}/login`);

// Función para registrar un nuevo usuario
export const register = async (userData) =>
    await axios.post(`${BASE_URL}/register`, userData);

// Función para iniciar sesión
export const login = async (credentials) =>
    await axios.post(`${BASE_URL}/login`, credentials);

/* export const verifyTokenApi = async () => 
    await axios.post(`${BASE_URL}/verify`, {}, { withCredentials: true });
 */

/* import axios from "axios";
import config from "../../config";

const myIp = config.ipAddress;
const BASE_URL = `http://${myIp}:3010`;

// Crear una instancia de Axios con withCredentials establecido como true
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const getVisitor = async () => await api.get('/login');

// Función para registrar un nuevo usuario
export const register = async (userData) => await api.post('/register', userData);

// Función para iniciar sesión
export const login = async (credentials) => await api.post('/login', credentials);

// Función para verificar el token
export const verifyTokenApi = async () => await api.post('/verify');
 */
