import { combineReducers } from "redux";
import imageAdder from "./imageAdder";


const rootReducers = combineReducers({
    imageAdder:imageAdder
})

export default rootReducers