import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState: { favoritesArray: any[]} = { favoritesArray: [] }

const favoritingSlice = createSlice({
  name: 'favoriting',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<any[]>) => {
      state.favoritesArray = action.payload
    }
  }
})

export const { setFavorites } = favoritingSlice.actions
export const selectFavorites =  (state: RootState) => state.favoriting.favoritesArray;
export default favoritingSlice.reducer
