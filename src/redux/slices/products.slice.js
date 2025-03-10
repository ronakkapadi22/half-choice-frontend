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
    async ({ isInitial, ...data }, { rejectWithValue }) => {
        try {
            const response = await api.product.get(data);
            return { response, isInitial }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getSearchProducts = createAsyncThunk(
    "products/getSearchProducts",
    async (data, { rejectWithValue }) => {
        try {
            return await api.product.search(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getSearchProductList = createAsyncThunk(
    "products/getSearchProductList",
    async (data, { rejectWithValue }) => {
        try {
            return await api.product.searchProduct(data);
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
    },
    search: {
        isLoading: false,
        data: [],
    },
    searchList: {
        isLoading: false,
        data: [],
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
            .addCase(getProduct.pending, (state, action) => {
                state.product.isLoading = action.meta.arg.isInitial ? true : false;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                const { response } = action.payload;
                state.product.data = response?.data?.data || {};
            })
            .addCase(getProduct.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.product.isLoading = false
            });
        builder
            .addCase(getSearchProducts.pending, (state) => {
                state.search.isLoading = true;
            })
            .addCase(getSearchProducts.fulfilled, (state, action) => {
                state.search.isLoading = false;
                const { data } = action.payload;
                state.search.data = data?.data || [];
            })
            .addCase(getSearchProducts.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.search.isLoading = false
            });
        builder
            .addCase(getSearchProductList.pending, (state) => {
                state.searchList.isLoading = true;
            })
            .addCase(getSearchProductList.fulfilled, (state, action) => {
                state.searchList.isLoading = false;
                const { data } = action.payload;
                state.searchList.data = data?.data || [];
            })
            .addCase(getSearchProductList.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.searchList.isLoading = false
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
