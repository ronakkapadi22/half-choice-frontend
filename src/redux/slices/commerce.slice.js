import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getCommerce = createAsyncThunk(
    "commerce/getCommerce",
    async (data, { rejectWithValue }) => {
        try {
            return await api.home.getAll(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
  isLoading: false,
  data: {
    promotions: [],
    newArrival: [],
    trendings: [],
  },
};

export const commerceSlice = createSlice({
  name: "commerce",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommerce.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getCommerce.fulfilled, (state, action) => {
        state.isLoading = false
        const { data } = action.payload
        state.data.promotions = data?.data?.promotions || []
        state.data.newArrival = data?.data?.newArrival || []
        state.data.trendings = data?.data?.trendings || []
    })
    .addCase(getCommerce.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
            return;
        }
        state.isLoading = false
    });
  }
});

export default commerceSlice.reducer;