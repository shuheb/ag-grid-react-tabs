import { applyMiddleware, createStore } from "redux";

import gridReducer from "./reducers/gridReducer";
import logger from "redux-logger";

import thunk from "redux-thunk";

const initialState = {
  grids: []
};

export default createStore(
  gridReducer,
  initialState,
  applyMiddleware(thunk, logger)
);
