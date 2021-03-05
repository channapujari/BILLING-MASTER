import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginReducer";
import userInfoReducer from "../reducers/userInfoReducer";
import customerReducer from "../reducers/customerReducer";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      userLoggedInstatus: loginReducer,
      userInfo: userInfoReducer,
      customers: customerReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
