export const addThisImage = (img,title)=>{
    return{
        type:'Add-Image',
        payload:{
            img:img,
            title:title
        }
    }
}
export const addThisPendingDetails = (img,title)=>{
    return{
        type:'Add-Details',
        payload:{
            img:img,
            title:title
        }
    }
}
export const isUserLoggedin = (bool)=>{
    return{
        type:'bool-verify',
        payload:bool
    }
}
export const AddTargetingToDisplay = (addId)=>{
    return{
        type:'DETECT-ADD-ID',
        payload:addId
    }
}