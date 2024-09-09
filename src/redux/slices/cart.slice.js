import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (data, { rejectWithValue }) => {
        try {
            return await api.cart.getAll(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isLoading: false,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                const { data } = action.payload;
                state.cart = data?.data || [];
            })
            .addCase(getCart.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoading = false;
            });
    },
});

export default cartSlice.reducer;
