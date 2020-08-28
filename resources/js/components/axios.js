
import Axios from 'axios'
class apiClient{
   axios = Axios;
    constructor(){
       
        this.axios.create({
            'Accept': 'application/json',
            'Content-Type':'application/json',
         
        
        })
    }
    canceltoken = Axios.CancelToken;
    source = this.canceltoken.source();
async sendPost(url,cred,config={}){
    
     let data = {

     }
     
      await axios.post(url,cred,{...config,Accept:'application/json'}).then(resp=>{ 
          
        let {message} = resp.data;
            
        data.code = resp.data.code;
        let res = '';
        data.message = message;

    if (typeof message === 'object' && message !== null){
     for(var error in message){
          
            res +=   message[error][0] + "\n"
       
     }
        data.message = res;
    }
        ;  }
        ).catch(error=>{  
            data.code = 0;
     data.message = "Something went Wrong";

    })
    return data;
}

async get(url,config={}){
    let data = null
    
  await  Axios.get(url,config).then(resp=>{
       
        data = resp.data
    }).catch(error=>{
     
            // handle error
            data = error;
            console.log(error);
         
   
    })
    return data
}
}
export default  new apiClient();