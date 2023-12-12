const initialstate = {
    src:'',
    title:''
}

const imageAdder= (state=initialstate,action)=>{
    if (action.type==='Add-Image'){
        return {
            ...state,
            src:action.payload.img,
            title:action.payload.title
        }
    }

    else {
        return state
    }
}

export default imageAdder