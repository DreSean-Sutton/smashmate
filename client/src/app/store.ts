import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import userReducer from '../features/registration/creating-account/createAccountSlice';
import userReducer from '../features/account/userSlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
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
