
export function cleanToast(){
    this.setState(prev=>({...prev,toast:{
        show: false,
        color:'',         
        title:'',
        message:''
     }}))
}

export function regState({config}) {

   

}

export function getValues (that){
  this.put =  async (event, state) => {
    const id = event.target.id
    const val = {
        value: event.target.value,
        state: state
    }

    await that.setState(prevState => ({ ...prevState, config: { ...prevState.config, [id]: val } }));
    console.log(that.state.config)
}
}

class ReactActivity {

    constructor(){

    }
}