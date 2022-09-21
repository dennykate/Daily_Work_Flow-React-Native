import { combineReducers } from "redux";
import { addData } from "./addData";

const reducer = combineReducers({
  data: addData,
});

export const rootReducer = (state, action) => {
  return reducer(state, action);
};
