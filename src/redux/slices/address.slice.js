import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getAddress = createAsyncThunk(
    "address/getAddress",
    async ({ isLoader, ...data }, { rejectWithValue }) => {
        try {
            const response = await api.address.getAll(data);
            return { response, isLoader }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isLoading: true,
    address: [],
    default: {}
};

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state, action) => {
            state.isLoading = action.meta.arg.isLoader
        })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.isLoading = false
                const { response: { data } } = action.payload
                const clone = [...data?.data]
                const defaultAddress = clone?.find(val => val?.isDefault)
                state.address = clone || []
                state.default = defaultAddress
            })
            .addCase(getAddress.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoading = false
            });
    }
});

export default addressSlice.reducer;