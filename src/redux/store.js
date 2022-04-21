import { applyMiddleware, combineReducers, createStore } from "redux";

import userReducer from "./reducers/user";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cart";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
