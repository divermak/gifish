import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import Gif from "types/Gif";

export interface FavoritesState {
  gifs: Gif[];
}

export const initialState: FavoritesState = {
  gifs: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Gif>) {
      state.gifs = state.gifs.concat(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.gifs = state.gifs.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectFavoritesIds = (state: RootState): Set<string> =>
  new Set(state.favorites.gifs.map(({ id }) => id));

export const selectFavorites = (state: RootState) => state.favorites.gifs;
