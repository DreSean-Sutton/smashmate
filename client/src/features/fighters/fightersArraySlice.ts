import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const initialState: { array: any[] } = { array: [] };

const fighterArraySlice = createSlice({
  name: 'fighterArray',
  initialState,
  reducers: {
    setFighterArray: (state, action: PayloadAction<any>) => {
      state.array = action.payload;
    }
  }
})

export const { setFighterArray } = fighterArraySlice.actions;
export const selectFighterArray = (state: RootState) => state.fighterArray.array
export default fighterArraySlice.reducer;
