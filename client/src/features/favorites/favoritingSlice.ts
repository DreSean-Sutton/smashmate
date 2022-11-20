import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

const initialState: { favoriteFighters: any} = { favoriteFighters: { length: 0, fighterData: {} } }

const favoritingSlice = createSlice({
  name: 'favoriting',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<any>) => {
      state.favoriteFighters = action.payload;
    },
    addFavorites: (state, action: PayloadAction<any>) => {
      state.favoriteFighters.fighterData[action.payload.fighter] = action.payload;
      state.favoriteFighters = Object.fromEntries(Object.entries(state.favoriteFighters).sort());
      state.favoriteFighters.length++;
    },
    deleteFavorites: (state, action: PayloadAction<any>) => {

      if (state.favoriteFighters.length === 1) {
        state.favoriteFighters.fighterData = {};
      } else {
        delete state.favoriteFighters.fighterData[action.payload.fighter];
      }
      state.favoriteFighters.length--;
    }
  }
})

export const { setFavorites, addFavorites, deleteFavorites } = favoritingSlice.actions;
export const selectFavorites =  (state: RootState) => state.favoriting.favoriteFighters;
export default favoritingSlice.reducer;
