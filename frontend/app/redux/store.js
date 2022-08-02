import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import authReducer, { AUTH_REDUCER_NAME } from "./reducers/authSlice";
import mainReducer, { MAIN_REDUCER_NAME } from "./reducers/mainSlice";

const persistConfig = {
  key: "root-7bcb2bc",
  version: 1,
  storage,
  whiteList: [AUTH_REDUCER_NAME],
  blackList: [MAIN_REDUCER_NAME],
};

const rootReducer = combineReducers({
  [AUTH_REDUCER_NAME]: authReducer,
  [MAIN_REDUCER_NAME]: mainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
