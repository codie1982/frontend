import axios from "axios";
const API_URL = "api/v10/company"
const addCompanyService = async (companyObject) => {
    const response = await axios.post(API_URL, companyObject);
    return response.data
}

const companyService = {
    addCompanyService
}
export default companyService