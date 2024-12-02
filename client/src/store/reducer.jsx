import { combineReducers } from "redux";
import userinfoeeducer from "./reducers/userinforeducer";
import authreducer from "./reducers/authreducer";

const minReducer = combineReducers({
  user: userinfoeeducer,
  auth: authreducer,
});

export default minReducer;
