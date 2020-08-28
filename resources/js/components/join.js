import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import Axios from 'axios'
import Toast from './toast'
import Activity from './reactact'
import apiClient from './axios'
import Loader from './loader'

export default class Join extends React.Component {
    componentDidMount() {
     
    }
    constructor(props) {
        super(props)
        this.activity = new Activity(this)
        this.state = {
            invalid: false,
            loader: false,
            config: {
                email: {
                    value: '',
                    state: false
                },
                password: {
                    value: '',
                    state: false
                },
                rememberme:{
                    value:false,
                    state:true
                }
            },
            toast: {
                show: false,
                color: '',
                title: '',
                message: '',

            }
        }
        console.log(props)
        this.default = this.state.config
    }
    login=  async () => {
          this.setState({loader:true,invalid:true})
        Axios.defaults.withCredentials = true;
        Axios.get('/sanctum/csrf-cookie'
        ).then(async resp=>{
         let    cred={
                users_email: this.state.config.email.value,
                password: this.state.config.password.value,
                rememberme: this.state.config.rememberme.value
            }
      let    response = await apiClient.sendPost('/dashboard/login',cred)
       if (response.code == 1){
          console.log(response)
          if(response.message != null){
            window.location.href = response.message
            return
          }
         window.location.href = '/dashboard/in/'


       }else{
           await this.activity.formend(response)
       }

         } );
    }

  
    render() {
        {console.log(this.state.config)}
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
                    <h4><strong> Login</strong></h4>
                    <hr></hr>
                    <form className="form" >
                        <InputText
                            type="email"
                            id="email"
                            label="Email"
                            value={this.state.config.email.value}
                            helper="Enter your Full Name"
                            getValues={this.activity.getValues}
                            constraint={{ required: true, email: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="password"
                            id="password"
                            label="Password"
                            value={this.state.config.password.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <span className="w-100 d-flex justify-content-start align-items-center"> <input
                            type="checkbox"
                            id="rememberme"
                            onClick={(e)=>this.activity.getValues(e,true)}
                        />
                                Remember Me
                              </span>
                              <button onClick={(e) => { e.preventDefault(); this.login() }} className="bbhf_btn bbhf_btn_green" disabled={this.activity.inputState() || this.state.invalid}>
                            {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                "Login"}</button>


                    </form>
                    <div className="fp-holder">
                        <a href="/dashboard/forgot" >Forgot Password?</a>
                        <a href="/dashboard/register" >Register <i className="fa fa-arrow-right"></i></a>
                    </div>
                </div>
            </>
        )
    }
}

if (document.getElementById('jointag')) {

    ReactDom.render(<Join />, document.getElementById('jointag'));
}