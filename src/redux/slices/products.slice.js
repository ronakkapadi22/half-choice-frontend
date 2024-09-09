import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (data, { rejectWithValue }) => {
        try {
            return await api.product.get(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    product: {
        isLoading: false,
        data: {},
    },
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.product.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                const { data } = action.payload;
                state.product.data = data?.data || {};
            })
            .addCase(getProduct.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.product.isLoading = false
            });
    },
});

export default productsSlice.reducer;
