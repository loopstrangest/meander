import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import tileReducer from "./tileReducer";

const rootReducer = combineReducers({
  tile: tileReducer,
  menu: menuReducer,
});

export default rootReducer;
