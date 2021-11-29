import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { updateSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
