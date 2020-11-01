import { configureStore } from "@reduxjs/toolkit";
import * as reducer from "./reducers";

export const store = configureStore({ reducer: reducer.authUserReducer });
