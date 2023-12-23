const initialstate = 0;

const verifyingBoolforUser= (state=initialstate,action)=>{
    if (action.type==='bool-verify'){
        return state=action.payload
    }
    else {
        return state
    }
}

export default verifyingBoolforUser