import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import commonSlice from "./common.slice";
import commerceSlice from "./commerce.slice";
import wishlistSlice from "./wishlist.slice";
import productsSlice from "./products.slice";
import cartSlice from "./cart.slice";
import addressSlice from "./address.slice";


export const reducers = combineReducers({
    auth: authSlice,
    common: commonSlice,
    commerce: commerceSlice,
    wishlist: wishlistSlice,
    products: productsSlice,
    cart: cartSlice,
    address: addressSlice
})