import { combineReducers } from "redux";
import imageAdder from "./imageAdder";
import PendingDetailsAdder from "./PendingDetails";
import verifyingBoolforUser from "./gettingUserLoginInfo";
import TargetingWhichAddToDisplay from "./TargetingAddtoExtend";


const rootReducers = combineReducers({
    imageAdder:imageAdder,
    PendingDetailsAdder:PendingDetailsAdder,
    verifyingBoolforUser:verifyingBoolforUser,
    TargetingWhichAddToDisplay:TargetingWhichAddToDisplay
})

export default rootReducers