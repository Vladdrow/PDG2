import axios from "axios";

const BASE_URL = "http://192.168.18.228:3010";

export const getHomePageData = async () => await axios.get(`${BASE_URL}/`);