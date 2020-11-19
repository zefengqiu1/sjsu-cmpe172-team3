import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./reducers/product";
import user from "./reducers/user"

const rootReducer = combineReducers({
  product, // product: product
  user
});

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])));
