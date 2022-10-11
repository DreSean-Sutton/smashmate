import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface userState {
  user: any
}

const initialState = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
})

export default userSlice.reducer;
