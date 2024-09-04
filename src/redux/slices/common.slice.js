import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ui_key: 'login'
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        handleAuthUI: (state, action) => {
            return {
                ...state, ui_key: action.payload
            }
        }
    }
})

export const { handleAuthUI } = commonSlice.actions

export default commonSlice.reducer;