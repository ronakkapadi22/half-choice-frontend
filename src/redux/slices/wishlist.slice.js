import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async (data, { rejectWithValue }) => {
        try {
            return await api.wishlists.getAll(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


const initialState = {
    isLoading: false,
    wishlist: []
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWishlist.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                const { data } = action.payload
                state.wishlist = data?.data || []
            })
            .addCase(getWishlist.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoading = false
            });
    }
});

export default wishlistSlice.reducer;