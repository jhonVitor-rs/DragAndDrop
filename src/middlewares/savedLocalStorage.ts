import { Middleware } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
import { RootState } from "../redux/store";

const localStorageMiddleware: Middleware<
  {},
  RootState
> = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState());
  return result;
};

export default localStorageMiddleware;
