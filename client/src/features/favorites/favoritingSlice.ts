import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState: { favoritesArray: any} = { favoritesArray: {} }

const favoritingSlice = createSlice({
  name: 'favoriting',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<any>) => {
      state.favoritesArray = action.payload;
    },
    addFavorites: (state, action: PayloadAction<any>) => {
      state.favoritesArray[action.payload.fighter] = action.payload;
      state.favoritesArray = Object.fromEntries(Object.entries(state.favoritesArray).sort());
    },
    deleteFavorites: (state, action: PayloadAction<any>) => {

      if (state.favoritesArray.length === 1) {
        state.favoritesArray = {};
      } else {
        state.favoritesArray.delete(action.payload.fighter)
      }
    }
  }
})

export const { setFavorites, addFavorites, deleteFavorites } = favoritingSlice.actions;
export const selectFavorites =  (state: RootState) => state.favoriting.favoritesArray;
export default favoritingSlice.reducer;
