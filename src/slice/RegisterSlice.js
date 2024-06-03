import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "student/register",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:8080/users/register",
          formData
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    formData: {},
    response: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log(state.status)
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "Successful";
        state.response = action.payload;
        console.log(state.status)
      })
      .addCase(register.rejected, (state, action) => {
        state.status = action.payload.response.status;
        state.error = action.payload.response.data.message;
        console.log(state.status)
      });
  },
});

export default registerSlice.reducer;
