


export default class Activity{

    constructor(that){
       this.comp = that;
       this.getValues = this.getValues.bind(this)
       this.inputState= this.inputState.bind(this)
       this.cleanToast= this.cleanToast.bind(this)
    }
comp = null;
    inputState(){
     let   {config} =this.comp.state;
        let state = Object.keys(config).some(key => {
            return config[key].state == false    
        }
        )
       
          return state
        
    }

    async getValues (event, state) {
     let     {target} = event
          const id = target.id
          const value = (target.type == 'checkbox')? target.checked:target.value
          const val = {
              value: value,
              state: state
          }
 
          await this.comp.setState(prevState => ({ ...prevState, config: { ...prevState.config, [id]: val } }));
         
    
      }



     async cleanToast(){
       await  this.comp.setState(prev=>({...prev,toast:{
            show: false,
            color:'',         
            title:'',
            message:''
         }}))
    }

    async formend({message,code}){
        let toastConfig = {
            show : true,
            color: '',
            title: '',
            message : message
        }
    
    
        if(code == 1){
              toastConfig.color = 'toastGreen'
              toastConfig.title = 'Success'         
              await this.comp.setState({config:this.comp.default,toast:toastConfig,loader:false,invalid:false})
        }else{
            toastConfig.color = 'toastRed'
            toastConfig.title = 'Failure'      
            await this.comp.setState({toast:toastConfig,loader:false,invalid:false})
        }
     
    }
}