import { combineReducers } from "redux";
import imageAdder from "./imageAdder";
import PendingDetailsAdder from "./PendingDetails";
import verifyingBoolforUser from "./gettingUserLoginInfo";


const rootReducers = combineReducers({
    imageAdder:imageAdder,
    PendingDetailsAdder:PendingDetailsAdder,
    verifyingBoolforUser:verifyingBoolforUser
})

export default rootReducers