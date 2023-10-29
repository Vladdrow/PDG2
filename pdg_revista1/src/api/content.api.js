import axios from "axios";
import config from "../../config"

const myIp = config.ipAddress;

const BASE_URL = `http://${myIp}:3010`;

/* export const getHomePageData = async () => await axios.get(`${BASE_URL}/`); */
export const getBookData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/book`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book data:", error);
        throw error;
    }
};

export const getCompaniesData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching companies data:", error);
        throw error;
    }
};
export const getSectionsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sections`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sections data:", error);
        throw error;
    }
};
export const getEditorsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/editors`);
        return response.data;
    } catch (error) {
        console.error("Error fetching editors data:", error);
        throw error;
    }
}

/* De acá pa abajo ya estaba */
export const getSocialNetworks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/social-networks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching social networks:", error);
        throw error;
    }
};
/* Esto no estaba */
export const getUserDataList = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/getUserDataList?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

/* Puede ser de la sgte manera:
const fetchAndDisplayImages = async () => {
    try {
        const imageFileNames = await listImages();
        const imageUrls = imageFileNames.map(fileName => `${BASE_URL}/assets/web/icon/social_networks/${fileName}`);
        // Ahora tienes un array de URLs que puedes usar para mostrar las imágenes
        console.log(imageUrls);
    } catch (error) {
        console.error('Error:', error);
    }
}; */
