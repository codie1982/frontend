import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import companyServices from './companyServices'

const initialState = {
  message:"",
  statusCode: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  data: {},
}
// Register user
export const addCompany = createAsyncThunk(
  'company',
  async (companyObject, thunkAPI) => {
    try {
      return await companyServices.addCompanyService(companyObject)
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
export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = action.payload.message
        state.data = action.payload.data
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload.message
        state.data = null
      })
  }
})


export const { resetCompanyState } = companySlice.actions
export default companySlice.reducer