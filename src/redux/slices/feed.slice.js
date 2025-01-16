import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, instagram } from "../../api";
import axios from "axios";

export const getSocialFeeds = createAsyncThunk(
    "feeds/getSocialFeeds",
    async (data, { rejectWithValue }) => {
        try {
            return await instagram.feeds(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    feeds: {
        isLoading: false,
        data: [],
    },
};

export const feedSlice = createSlice({
    name: "feeds",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSocialFeeds.pending, (state) => {
                state.feeds.isLoading = true;
            })
            .addCase(getSocialFeeds.fulfilled, (state, action) => {
                state.feeds.isLoading = false;
                const data = action.payload;
                state.feeds.data = data?.data || [];
            })
            .addCase(getSocialFeeds.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.feeds.isLoading = false;
            });
    },
});

export default feedSlice.reducer
