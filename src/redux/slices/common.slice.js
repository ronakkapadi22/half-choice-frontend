import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ui_key: 'login',
    home_banners: [],
    what_we_do: [],
    home_posters: [],
    popular_link: [],
    seo: {}
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        handleAuthUI: (state, action) => {
            return {
                ...state, ui_key: action.payload
            }
        },
        handleRemoteConfig: (state, action) => {
            return {
                ...state, ...action.payload
            }
        }
    }
})

export const { handleAuthUI, handleRemoteConfig } = commonSlice.actions

export default commonSlice.reducer;