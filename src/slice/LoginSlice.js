import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginStudent = createAsyncThunk(
  'student/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", credentials);
      return response.data; 
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    credentials: {},
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginStudent.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(loginStudent.fulfilled, (state, action) => {
      state.status = 'success';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.role = action.payload.role;  
      console.log(localStorage.getItem('accessToken'));
    });
    builder.addCase(loginStudent.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export default loginSlice.reducer;
