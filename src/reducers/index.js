import { combineReducers } from "redux";
import tileReducer from "./tileReducer";

const rootReducer = combineReducers({
  tile: tileReducer,
});

export default rootReducer;
