import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import PublicReducer, { PublicState } from "../views/public/actions/reducer";

export interface RootState {
  public: PublicState;
}

export const rootReducer = combineReducers({
  public: PublicReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
