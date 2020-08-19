
import Axios from 'axios'
class apiClient{
   axios = Axios;
    constructor(){
       
        this.axios.create({
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'baseURL': 'http://localhost:8000/api/'
        
        })
    }

async sendPost(url,cred){
     let data = {

     }
      await axios.post(url,cred,{Accept:'application/json'}).then(resp=>{ 
          
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
        console.log(resp)  ;  }
        ).catch(error=>{  
            data.code = 0;
     data.message = error;

    })
    return data;
}

async get(url){
    let data = null
  await  Axios.get(url).then(resp=>{
       
        data = resp.data
    }).catch(error=>{
        data = error;
    })
    return data
}
}
export default  new apiClient();