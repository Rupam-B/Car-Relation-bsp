const initialstate = {
    src:''
}

const imageAdder= (state=initialstate,action)=>{
    if (action.type==='Add-Image'){
        return {
            ...state,
            src:action.payload
        }
    }

    else {
        return state
    }
}

export default imageAdder