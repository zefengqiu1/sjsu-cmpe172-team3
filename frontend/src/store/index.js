import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./reducers/product";
import user from "./reducers/user"
import order from "./reducers/order"

const rootReducer = combineReducers({
  product, // product: product
  user,
  order
});

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])));
