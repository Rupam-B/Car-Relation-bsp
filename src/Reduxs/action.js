export const addThisImage = (img,title)=>{
    return{
        type:'Add-Image',
        payload:{
            img:img,
            title:title
        }
    }
}