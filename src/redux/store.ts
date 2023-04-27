import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { loadState } from "../middlewares/localStorage";
import localStorageMiddleware from "../middlewares/savedLocalStorage"

const persistedState = loadState();

const rootReducer = combineReducers({
  reducer: reducer
})

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: [localStorageMiddleware]
})

export default store