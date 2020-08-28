import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import { SelectInput } from './input'
import { regState, getValues } from './cleantoast'
import Toast from './toast'
import Activity from './reactact'
import apiClient from './axios'
import Loader from './loader'
export default class Forget extends React.Component {

    constructor(props) {
        super(props)
        this.activity = new Activity(this);
        this.state = {
            loader:false,
            invalid:false,
            config: {
                  email: {
                    value: '',
                    state: false
                }
            },
            toast: {
                show: false,
                color: '',
                title: '',
                message: '',

            }
        }
      
        this.default = this.state.config
    }


   forget =  async (e)=>{
      
   this.setState({loader:true,inavlid:true})
   let cred = {
       email : this.state.config.email.value
   }
  let response = await apiClient.sendPost('/api/forgot',cred)

  this.activity.formend(response)

   }



    render() {
        return (
            <>
                <div className="login-container">
                    <Toast

                        show={this.state.toast.show ? "show" : ''}
                        color={this.state.toast.color}
                        title={this.state.toast.title}
                        message={this.state.toast.message}
                        cleanToast={this.activity.cleanToast}
                    />
                    <h4><strong> Fogot Password? </strong></h4>
                    <small> Enter Account Email </small>
                    <hr></hr>
                    <form className="form" >
                        <InputText
                            type="email"
                            id="email"
                            label="Email"
                            value={this.state.config.email.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true, email: true }}

                        />


                        <button onClick={(e) => { e.preventDefault(); this.forget() }} className="bbhf_btn bbhf_btn_green" disabled={this.activity.inputState() || this.state.invalid}>
                            {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                "Recover Password"}</button>



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

if (document.getElementById('forget')) {

    ReactDom.render(<Forget />, document.getElementById('forget'));
}