import { combineReducers } from "redux";
import imageAdder from "./imageAdder";
import PendingDetailsAdder from "./PendingDetails";


const rootReducers = combineReducers({
    imageAdder:imageAdder,
    PendingDetailsAdder:PendingDetailsAdder
})

export default rootReducers