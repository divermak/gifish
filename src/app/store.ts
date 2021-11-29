import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "features/search/searchSlice";
import favoritesReducer from "features/favorites/favoritesSlice";
import { giphyApi } from "services/giphy";
import LocalStateStorage from "./stateStorage";

const stateStorage = new LocalStateStorage();
const preloadedState = {};
const state = stateStorage.read();
Reflect.set(preloadedState, "favorites", state?.favorites);

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(giphyApi.middleware),
  preloadedState,
});

store.subscribe(() => {
  stateStorage.write(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
