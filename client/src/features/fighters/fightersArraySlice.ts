import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const initialState: { fighters: any } = { fighters: { length: 0, fighterData: {} } };

const fighterArraySlice = createSlice({
  name: 'fighterArray',
  initialState,
  reducers: {
    setFighterArray: (state, action: PayloadAction<any>) => {
      state.fighters = action.payload;
    }
  }
})

export const { setFighterArray } = fighterArraySlice.actions;
export const selectFighterArray = (state: RootState) => state.fighterArray.fighters
export default fighterArraySlice.reducer;
