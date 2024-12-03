import axios from "axios";
const API_URL = "api/v10/llm/"
const conversitionLLM = async (data) => {
    const response = await axios.post(API_URL + "conversition", { human_message:data.human_message,id:data.id });
    return response.data
}
const answerQuestion = async (data) => {
    const response = await axios.post(API_URL + "answer_question",data);
    return response.data
}
const cancelQuestion = async (data) => {
    const response = await axios.post(API_URL + "cancel_question",data);
    return response.data
}

const llmService = {
    conversitionLLM,answerQuestion,cancelQuestion
}
export default llmService