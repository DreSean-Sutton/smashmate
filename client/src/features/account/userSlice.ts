import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  user: any
}

const initialState: UserState = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.user;

export default userSlice.reducer;
