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
}
// Register user
export const searchProduct = createAsyncThunk(
  'llm/promt',
  async (user, thunkAPI) => {
    try {
      return await llmServices.searchllm(user)
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
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = action.payload.message
        state.data = action.payload.data
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload.message
        state.data = null
      })
  }
})


export const { resetllm } = llmSlice.actions
export default llmSlice.reducer