import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (data, { rejectWithValue }) => {
        try {
            return await api.orders.getAll(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (data, { rejectWithValue }) => {
        try {
            return await api.orders.get(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getReasons = createAsyncThunk(
    "order/getReasons",
    async (data, { rejectWithValue }) => {
        try {
            return await api.orders.reason(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isLoading: false,
    orders: [],
    order: {
        data: null,
        isLoading: false,
    },
    reasons: {
        data: null,
        isLoading: false
    }
};

export const ordersSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                const { data } = action.payload;
                state.orders = data?.data || [];
            })
            .addCase(getOrders.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoading = false;
            });
        builder
            .addCase(getOrder.pending, (state) => {
                state.order.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order.isLoading = false;
                const { data } = action.payload;
                state.order.data = data?.data || {};
            })
            .addCase(getOrder.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.order.isLoading = false;
            });
        builder
            .addCase(getReasons.pending, (state) => {
                state.reasons.isLoading = true;
            })
            .addCase(getReasons.fulfilled, (state, action) => {
                state.reasons.isLoading = false;
                const { data } = action.payload;
                state.reasons.data = data?.data || {};
            })
            .addCase(getReasons.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.reasons.isLoading = false;
            });
    },
});

export default ordersSlice.reducer;
