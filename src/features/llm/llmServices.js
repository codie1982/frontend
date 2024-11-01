import axios from "axios";
const API_URL = "api/v10/llm/search"
const searchllm = async (message) => {
    const response = await axios.post(API_URL, { message });
    return response.data
}

const authService = {
    searchllm
}
export default authService