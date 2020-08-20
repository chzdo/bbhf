import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import Axios from 'axios'


export default class Join extends React.Component{
componentDidMount(){
   Axios.get('http://localhost:8000/sanctum/csrf-cookie').then(
 Axios.post('http://localhost:8000/auth',{
        'users_email': 'c@gj.ll',
       'password':'password'
    },{

    }).then(ressp=>console.log(ressp))
   );
}
    constructor(props){
        super(props)

        this.state={
            config:{

            }
        }
        console.log(props)
    }
test=(e)=>{
    e.preventDefault();
    Axios.defaults.withCredentials = true;
Axios.get('http://localhost:8000/api/user',{
  
}
    );
}
    render(){
        return(
         <>
            <div className="login-container">
                <h2><strong> Login</strong></h2>
                <hr></hr>
                  <form className="form" >
                          <InputText 
                            type="email"
                            id="email"
                            label="Email"
                            value = {this.state.config.name}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,email:true}}
                            reset = {this.state.reset}
                            />
                             <InputText 
                            type="password"
                            id="password"
                            label="Password"
                            value = {this.state.config.password}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                           <span class="w-100 d-flex justify-content-start align-items-center"> <input 
                              type="checkbox"
                              />
                                Remember Me
                              </span>
                           <button className="bbhf_btn bbhf_btn_green" onClick={this.test}>Login </button>
                         
                   
                  </form>
                  <div className="fp-holder">
                               <a href="/dashboard/forgotpassword" >Forgot Password?</a>
                               <a href="/dashboard/register" >Register <i className="fa fa-arrow-right"></i></a>
                           </div>
                  </div>
        </>
        )
    }
}

if(document.getElementById('jointag')){

    ReactDom.render(<Join  />,document.getElementById('jointag'));
}