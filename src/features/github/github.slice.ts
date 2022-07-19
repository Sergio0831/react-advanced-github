import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GithubState {
  favorites: string[];
}

const initialState: GithubState = {
  favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]')
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<string>) {
      state.favorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  }
});

export const { addToFavorites, removeFromFavorites } = githubSlice.actions;
export const gitHubReducer = githubSlice.reducer;
