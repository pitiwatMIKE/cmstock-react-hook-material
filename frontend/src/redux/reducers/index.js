import { combineReducers } from "redux";
import loginReducer from "./login.reducer"
import registerReducer from "./register.reducer"
import stockReducer from "./stock.reducer"

export default combineReducers({loginReducer, registerReducer, stockReducer})