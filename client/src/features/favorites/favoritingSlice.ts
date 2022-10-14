import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState: { favoritesArray: any[]} = { favoritesArray: [] }

const favoritingSlice = createSlice({
  name: 'favoriting',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<any[]>) => {
      state.favoritesArray = action.payload
    },
    addFavorites: (state, action: PayloadAction<any>) => {
      const newFavorites: any[] = [...state.favoritesArray, action.payload];
      state.favoritesArray = newFavorites.sort((a: any, b: any) => (a.fighterId > b.fighterId) ? 1 : -1);
    }
  }
})

export const { setFavorites, addFavorites } = favoritingSlice.actions
export const selectFavorites =  (state: RootState) => state.favoriting.favoritesArray;
export default favoritingSlice.reducer
