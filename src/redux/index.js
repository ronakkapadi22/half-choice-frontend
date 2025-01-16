import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducers } from "./slices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific paths or allow functions in actions temporarily
        ignoredActions: ['persist/PERSIST'], // Add actions that need to be ignored
        ignoredPaths: ['register', 'rehydrate'], // Ignore paths that contain functions
      },
    })
});

export const persistor = persistStore(store);