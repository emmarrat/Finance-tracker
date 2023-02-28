import {configureStore} from "@reduxjs/toolkit";
import {financeTrackerReducer} from "../features/financeTracker/financeTrackerSlice";

export const store = configureStore({
  reducer: {
    financeTracker: financeTrackerReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;