
export function cleanToast(){
    this.setState(prev=>({...prev,toast:{
        show: false,
        color:'',         
        title:'',
        message:''
     }}))
}