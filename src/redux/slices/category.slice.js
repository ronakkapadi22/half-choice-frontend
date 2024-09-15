import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";


export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (data, { rejectWithValue }) => {
        try {
            return await api.category.getAll(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isLoading: false,
    data: []
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                const { data } = action.payload
                state.data = data?.data || []
            })
            .addCase(getCategories.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoading = false
            });
    }
})

export default categorySlice.reducer;