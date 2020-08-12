import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import {SelectInput}  from './input'


export default class Register extends React.Component{

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
                            type="text"
                            id="first"
                            label="First Name"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                            <InputText 
                            type="text"
                            id="other"
                            label="Other Name"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                            <InputText 
                            type="text"
                            id="last"
                            label="Last Name"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                            <InputText 
                            type="email"
                            id="email"
                            label="Email"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true, email:true}}
                            reset = {this.state.reset}
                            />
                               <InputText 
                            type="number"
                            id="phone"
                            label="Phone Number"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true, max:11, min:11, number:true}}
                            reset = {this.state.reset}
                            />
                            <SelectInput
                                 id="state"
                                 isLoading = {true}
                                  data = {[]}
                                  label ="state of residence"
                                   valueKeys = {{"value":"state","label":"state"}}
                                  value ={this.state.config.state}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                                  <SelectInput
                                 id="type"
                                 isLoading = {this.state.project_loader}
                                  data = {this.state.type}
                                  label ="Type of Rrgistration"
                                   valueKeys = {{"value":"id","label":"role"}}
                                  value ={this.state.config.type}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                            
                          
                           <button className="bbhf_btn bbhf_btn_green">Register</button>
                         
                   
                  </form>
                  <div className="fp-holder">
                               <a href="/dashboard/login" ><i className="fa fa-arrow-left"> </i>login </a>
                               <a href="/dashboard/forgot" > Forgot Pasword? </a>
                           </div>
                  </div>
        </>
        )
    }
}

if(document.getElementById('register')){

    ReactDom.render(<Register  />,document.getElementById('register'));
}