import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FreshCartAPI } from "./service/freshcart";
import authReducer from "./service/loggedUserData";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [FreshCartAPI.reducerPath]: FreshCartAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FreshCartAPI.middleware),
  preloadedState: persistedState,
});

setupListeners(store.dispatch);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});
