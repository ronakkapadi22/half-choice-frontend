import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";


export const reducers = combineReducers({
    auth: authSlice
})