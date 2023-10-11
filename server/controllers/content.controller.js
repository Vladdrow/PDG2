import {
    fetchBook,
    fetchCompaniesImg,
    fetchAllSections,
    fetchAllEditors
} from "../services/content.service.js";

export const getHomePageData = async (req, res) => {
    try {
        const books = await fetchBook();
        const companies = await fetchCompaniesImg();
        const sections = await fetchAllSections();
        const editors = await fetchAllEditors();

        const consolidatedData = {
            books,
            companies,
            sections,
            editors
        };

        res.json(consolidatedData);

    } catch (error) {
        console.error("Error fetching consolidated data for Home:", error);
        res.status(500).send("Error fetching data for Home.");
    }
};