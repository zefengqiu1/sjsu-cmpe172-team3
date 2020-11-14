import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import product from "./reducers/product";

const rootReducer = combineReducers({
  product, // product: product
});

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])));
