const initialstate = null;



const TargetingWhichAddToDisplay= (state=initialstate,action)=>{
    if (action.type==='DETECT-ADD-ID'){

        return state=action.payload
    }
    else {
        return state
    }
}

export default TargetingWhichAddToDisplay