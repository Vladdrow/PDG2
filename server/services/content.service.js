import {
    getBookInfo,
    getCompaniesImg,
    getAllSections,
    getAllEditors
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
