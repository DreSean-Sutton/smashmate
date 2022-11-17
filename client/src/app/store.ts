import { configureStore, PreloadedState, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/account/userSlice';
import fighterArrayReducer from '../features/fighters/fightersArraySlice';
import favortingReducer from '../features/favorites/favoritingSlice';

const rootReducer = combineReducers({
  currentUser: userReducer,
  fighterArray: fighterArrayReducer,
  favoriting: favortingReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
