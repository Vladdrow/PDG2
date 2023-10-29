import {
    getBookInfo,
    getCompaniesImg,
    getAllSections,
    getAllEditors,
    getSocialNetworksFromDB,
    getBasicUsersUnified,
} from "../data/content.data.js";

export const fetchBook = async () => {
    return await getBookInfo();
};

export const fetchCompaniesImg = async () => {
    return await getCompaniesImg();
};

export const fetchAllSections = async () => {
    return await getAllSections();
};

export const fetchAllEditors = async () => {
    return await getAllEditors();
};

export const fetchSocialNetworks = async () => {
    return await getSocialNetworksFromDB();
};
/* Editores */
export const fetchBasicUsersUnified = async (page, pageSize) => {
    return await getBasicUsersUnified(page, pageSize);
};

/* export const fetchSocialNetworksIcon = async () => {
    const files = await getSocialNetworksIcon();
    return files;
}; */
