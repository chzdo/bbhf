import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import {SelectInput}  from './input'


export default class Reset extends React.Component{

    constructor(props){
        super(props)

        this.state={
            config:{

            }
        }
        console.log(props)
    }

    render(){
        return(
         <>
            <div className="login-container">
                <h2><strong> Register</strong></h2>
                <hr></hr>
                  <form className="form" >
                          <InputText 
                            type="password"
                            id="password"
                            label="New Password"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                           
                           <InputText 
                            type="password"
                            id="repassword"
                            label="Re-Type Password"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                           <button className="bbhf_btn bbhf_btn_green">Reset Password</button>
                         
                   
                  </form>
              
                  </div>
        </>
        )
    }
}

if(document.getElementById('reset')){

    ReactDom.render(<Reset  />,document.getElementById('reset'));
}