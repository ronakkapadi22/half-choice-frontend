import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import axios from "axios";

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async ({ isLoader, query, isInitial, ...data }, { rejectWithValue }) => {
        try {
            const response = await api.product.getAll(data);
            return { response, isLoader, query, isInitial }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
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
    products: {
        loader: false,
        isLoading: false,
        data: [],
        total: 0,
        pagination: {
            pageNumber: 1,
            pageSize: 16
        }
    }
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        handlePagination: (state, action) => {
            state.products.pagination = action.payload
        }
    },
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
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.products.isLoading = action.meta.arg.isLoader;
                state.products.loader = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products.isLoading = false;
                const { response: { data }, query, isInitial } = action.payload;
                state.products.data = isInitial ? data?.data?.productData : [...state.products.data, ...data?.data?.productData];
                state.products.total = data?.data?.totalCount || [];
                state.products.pagination = {
                    ...state.products.pagination, ...query
                }
                state.products.loader = false

            })
            .addCase(getProducts.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.products.isLoading = false
                state.products.loader = false
            });
    },
});

export const { handlePagination } = productsSlice.actions
export default productsSlice.reducer;
