import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
export interface FightersState {array: any[]}
const initialState: FightersState = { array: [] };

const fightersSlice = createSlice({
  name: 'fighters',
  initialState,
  reducers: {
    setFighters: (state, action: PayloadAction<any>) => {
      state.array = action.payload;
    }
  }
})

export const { setFighters } = fightersSlice.actions;
export const selectFighters = (state: RootState) => state.fighters.array
export default fightersSlice.reducer;
