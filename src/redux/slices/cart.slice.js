import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async ({ isLoader, ...data }, { rejectWithValue }) => {
        try {
            const response = await api.cart.getAll(data);
            return { response, isLoader }
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
            .addCase(getCart.pending, (state, action) => {
                state.isLoading = action.meta.arg.isLoader
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                const { response: { data } } = action.payload
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
