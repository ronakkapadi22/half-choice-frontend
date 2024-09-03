import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import commonSlice from "./common.slice";


export const reducers = combineReducers({
    auth: authSlice,
    common: commonSlice
})