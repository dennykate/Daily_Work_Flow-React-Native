import { createStore } from "redux";
import { rootReducer } from "../Reducers";

export const configureStore = (initialState) => {
  return createStore(rootReducer, initialState);
};
