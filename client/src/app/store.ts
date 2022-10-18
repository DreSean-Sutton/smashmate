import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/account/userSlice';
import fighterArrayReducer from '../features/fighters/fightersArraySlice';
import favortingReducer from '../features/favorites/favoritingSlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    fighterArray: fighterArrayReducer,
    favoriting: favortingReducer,
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
