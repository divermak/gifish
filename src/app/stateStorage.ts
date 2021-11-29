import { initialState as favoritesInitialState } from "features/favorites/favoritesSlice";
import { RootState } from "./store";

interface StateStorage {
  read(): RootState | undefined;
  write(state: RootState): void;
}

const STATE_KEY = "persistedState";

class LocalStateStorage implements StateStorage {
  read() {
    let state: RootState | undefined;

    try {
      const value = localStorage.getItem(STATE_KEY);
      state = (value ? JSON.parse(value) : { favorites: favoritesInitialState }) as RootState;
    } catch (e) {
      console.warn(e);
    }

    return state;
  }

  write(state: RootState): void {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ favorites: state.favorites }));
    } catch (e) {
      console.warn(e);
    }
  }
}

export default LocalStateStorage;
