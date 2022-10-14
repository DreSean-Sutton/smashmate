import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/account/userSlice';
import fighterArrayReducer from '../features/fighters/fightersArraySlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    fighterArray: fighterArrayReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
