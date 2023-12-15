const initialstate = {
    src:'',
    title:''
}

const PendingDetailsAdder= (state=initialstate,action)=>{
    if (action.type==='Add-Details'){
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

export default PendingDetailsAdder