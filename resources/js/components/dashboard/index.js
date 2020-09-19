import React from 'react'
import ReactDom from 'react-dom'
import LOGO from '../logo'
import apiClient from '../axios'
import Admin  from './admin/index'
import {HashRouter, BrowserRouter as Router} from 'react-router-dom'
import { Network } from '../loader'
import Provider from './usercontext'


export default class Cont extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loader:true,
            role:'',
            user:{}

        }
        
    }
users=[
    1,
    2,
    3,
    4
]

loadUser = async() =>{

    let response = await apiClient.get('/api/user')
  if(response.code == 1){
 let   {role_id} = response.message;
  let c =  (this.users).includes(role_id);
    if(!c){
        window.location = '/dashboard/login'
    }
 await   this.setState({loader:false,user:response.message,network:false})
  }else{
      window.location = '/dashboard/login'
  }
}
async componentDidMount(){

    console.log(this.context)
this.loadUser();

}

update = (user)=>{
    console.log(user)
    this.setState({user:user})
}
    render(){
        return(
            <>
         {this.state.loader?  <LOGO /> : this.state.network? 
         <Network action={this.loadUser} />: 
         <Router>
           { this.state.user.role_id == this.users[3] ? 
           <Provider.Provider value={{...this.state.user,update:this.update}} >
               <Admin  />
               </Provider.Provider> :null }
                            </Router>
    }
        
            </>
                    

           


        )
    }
}
if (document.getElementById('router')) {

    ReactDom.render(<Cont />, document.getElementById('router'));
}