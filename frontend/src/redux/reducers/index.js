import { combineReducers } from "redux";
import loginReducer from "./login.reducer"
import registerReducer from "./register.reducer"

export default combineReducers({loginReducer, registerReducer})