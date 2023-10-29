import {
    fetchBook,
    fetchCompaniesImg,
    fetchAllSections,
    fetchAllEditors,
    fetchSocialNetworks,
    fetchBasicUsersUnified
} from "../services/content.service.js";


export const getBookData = async (req, res) => {
    try {
        const book = await fetchBook();
        res.json(book);
    } catch (error) {
        console.error("Error fetching book data:", error);
        res.status(500).send("Error fetching book data.");
    }
};

export const getCompaniesData = async (req, res) => {
    try {
        const companies = await fetchCompaniesImg();
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies data:", error);
        res.status(500).send("Error fetching companies data.");
    }
};

export const getSectionsData = async (req, res) => {
    try {
        const sections = await fetchAllSections();
        res.json(sections);
    } catch (error) {
        console.error("Error fetching sections data:", error);
        res.status(500).send("Error fetching sections data.");
    }
};

export const getEditorsData = async (req, res) => {
    try {
        const editors = await fetchAllEditors();
        res.json(editors);
    } catch (error) {
        console.error("Error fetching editors data:", error);
        res.status(500).send("Error fetching editors data.");
    }
};


export const getSocialNetworks = async (req, res) => {
    try {
        const networks = await fetchSocialNetworks();
        res.send(networks[0]);
    } catch (err) {
        res.status(500).send('Unable to fetch social networks: ' + err);
    }
};

/* EDITORES */
/* export const getBasicUsersUnifiedData = async (req, res) => {
    try {
        const users = await fetchBasicUsersUnified();
        res.json(users);
    } catch (error) {
        console.error("Error fetching basic unified user data:", error);
        res.status(500).send("Error fetching basic unified user data.");
    }
}; */

export const getBasicUsersUnifiedData = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Por defecto página 1
    const pageSize = parseInt(req.query.pageSize) || 20; // Por defecto 20 registros por página

    try {
        const users = await fetchBasicUsersUnified(page, pageSize);
        res.json(users);
    } catch (error) {
        console.error("Error fetching basic unified user data:", error);
        res.status(500).send("Error fetching basic unified user data.");
    }
};

/* export const getSocialNetworksIcon = async (req, res) => {
    try {
        const files = await fetchSocialNetworksIcon();
        res.send(files);
    } catch (err) {
        res.status(500).send('Unable to scan directory: ' + err);
    }
}; */