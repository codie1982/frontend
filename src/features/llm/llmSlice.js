import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import llmServices from './llmServices'
//const user = JSON.parse(localStorage.getItem('user'))
//const url = JSON.parse(localStorage.getItem('url'))

const initialState = {
  message:"",
  statusCode: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  data: {},
  questions: [],
}
 
export const conversition = createAsyncThunk(
  'llm/promt',
  async (input, thunkAPI) => {
    try {
      return await llmServices.conversitionLLM(input)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const answerQuestion = createAsyncThunk(
  'llm/question',
  async (input, thunkAPI) => {
    try {
      return await llmServices.answerQuestion(input)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const cancelQuestion = createAsyncThunk(
  'llm/promt',
  async (input, thunkAPI) => {
    try {
      return await llmServices.cancelQuestion(input)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const llmSlice = createSlice({
  name: 'llm',
  initialState,
  reducers: {
    resetllm: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(conversition.pending, (state) => {
        state.isLoading = true
      })
      .addCase(conversition.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = action.payload.data.llm_message
        state.questions = action.payload.data.questions
      })
      .addCase(conversition.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload.data.llm_message
        state.data = null
        state.questions = null

      })
  }
})


export const { resetllm } = llmSlice.actions
export default llmSlice.reducer