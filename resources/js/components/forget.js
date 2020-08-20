import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import {SelectInput}  from './input'


export default class Forget extends React.Component{

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
                <h2><strong> Fogot Password? </strong></h2>
                <small> Enter Account Email </small>
                <hr></hr>
                  <form className="form" >
                          <InputText 
                            type="email"
                            id="emailt"
                            label="Email"
                            value = {this.state.config.name}
                            getValues = {this.getValues}
                            constraint={{required:true}}
                            reset = {this.state.reset}
                            />
                           
                          
                           <button className="bbhf_btn bbhf_btn_green">Send Recovery Email</button>

                         
                   
                  </form>
                 <div className="fp-holder">
                               <a href="/dashboard/login" ><i className="fa fa-arrow-left"> </i>login </a>
                               <a href="/dashboard/register" > Register <i className="fa fa-arrow-right"></i></a>
                           </div>
                  </div>
        </>
        )
    }
}

if(document.getElementById('forget')){

    ReactDom.render(<Forget  />,document.getElementById('forget'));
}