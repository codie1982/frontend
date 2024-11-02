import { configureStore } from "@reduxjs/toolkit";
import llmReducer from '../features/llm/llmSlice'
import companReducer from '../features/company/companySlice'

export const store = configureStore({
    reducer: {
        llm: llmReducer,
        company:companReducer
    }
})