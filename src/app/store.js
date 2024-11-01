import { configureStore } from "@reduxjs/toolkit";
import llmReducer from '../features/llm/llmSlice'
export const store = configureStore({
    reducer: {
        llm: llmReducer,
    }
})