import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import { SelectInput } from './input'
import apiClient from './axios'
import axios from 'axios'
import Toast from './toast'
import Loader from './loader'
export default class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loader:false,
            invalid:false,
            stateloading: true,
            states: [

            ],
            roles: [

            ],
            rolesloading: true,
            toast:{
                show:false,
                color:'',
                title:'',
                message:'',
            
            },
            config: {

                first_name: {
                    value: '',
                    state: false
                },
                other_name: {
                    value: '',
                    state: false
                },
                last_name: {
                    value: '',
                    state: false
                },
                email: {
                    value: '',
                    state: false
                },
                phone_number: {
                    value: '',
                    state: false
                },
                state_of_residence: {
                    value: '',
                    state: false
                },
                role_id: {
                    value: '',
                    state: false
                },

            }

        }
        console.log(props)
    }


    defaultvalue = {
        first_name: {
            value: '',
            state: false
        },
        other_name: {
            value: '',
            state: false
        },
        last_name: {
            value: '',
            state: false
        },
        email: {
            value: '',
            state: false
        },
        phone_number: {
            value: '',
            state: false
        },
        state_of_residence: {
            value: '',
            state: false
        },
        role_id: {
            value: '',
            state: false
        },

    }

    async componentWillMount() {

        let states = await axios.all([axios.get('http://locationsng-api.herokuapp.com/api/v1/states'),
        axios.get('/api/roles')]);;
        console.log(states)
        let response = await states;
        let roles = {};
        if (response[1].data.code == 1) {
            roles = response[1].data.message;
        }
        this.setState(prev => ({
            ...prev, stateloading: false, rolesloading: false, states: response[0].data, roles: roles
        }))
            console.log(thi.state)
    }


    async componentDidMount() {
        let a = await apiClient.get('/api/roles');
        console.log("het", a)
    }

    getValues = async (event, state) => {
        const id = event.target.id
        const val = {
            value: event.target.value,
            state: state
        }

        await this.setState(prevState => ({ ...prevState, config: { ...prevState.config, [id]: val } }));
        console.log(this.state.config)
    }


    regState = () => {
        let state = Object.keys(this.state.config).some(key => {
            return this.state.config[key].state == false

        }
        )
        return state
    
    }


 
    cleanToast = () =>{  
        this.setState(prev=>({...prev,toast:{
           show: false,
           color:'',         
           title:'',
           message:''
        }}))
     }

register = async (e) =>{
  await this.setState({loader:true,invalid:true})
  let {email,first_name,other_name,last_name,phone_number,state_of_residence,role_id} = this.state.config
  let cred = {
    email:email.value,
    first_name:first_name.value,
    other_name:other_name.value,
    last_name:last_name.value,
    phone_number:phone_number.value,
    state_of_residence:state_of_residence.value,
    role_id:role_id.value,
  }
    let register = await  apiClient.sendPost('api/register',cred)
    let {message, code } = register;                   

    let toastConfig = {
        show : true,
        color: 'toastGreen',
        title: 'Success',
        message : register.message
    }


    if(register.code == 1){
          toastConfig.color = 'toastGreen'
          toastConfig.title = 'Success'
     
          await this.setState({config:this.defaultvalue,toast:toastConfig,loader:false})
    }else{
        toastConfig.color = 'toastRed'
        toastConfig.title = 'Failure'
  
        await this.setState({toast:toastConfig,loader:false,invalid:false})
    }
 
 
    console.log('reg',register)
    
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
                        cleanToast={this.cleanToast}
                    />
                    <h4><strong> Register</strong></h4>
                    <hr></hr>
                    <form className="form" >
                        <InputText
                            type="text"
                            id="first_name"
                            label="First Name"
                            value={this.state.config.first_name.value}
                            getValues={this.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="text"
                            id="other_name"
                            label="Other Name"
                            value={this.state.config.other_name.value}
                            getValues={this.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="text"
                            id="last_name"
                            label="Last Name"
                            value={this.state.config.last_name.value}
                            getValues={this.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="email"
                            id="email"
                            label="Email"
                            value={this.state.config.email.value}
                            getValues={this.getValues}
                            constraint={{ required: true, email: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="number"
                            id="phone_number"
                            label="Phone Number"
                            value={this.state.config.phone_number.value}
                            getValues={this.getValues}
                            constraint={{ required: true, max: 11, min: 11 }}
                            reset={this.state.reset}
                        />
                        <SelectInput
                            id="state_of_residence"
                            isLoading={this.state.stateloading}
                            data={this.state.states}
                            label="state of residence"
                            valueKeys={{ "value": "name", "label": "name" }}
                            value={this.state.config.state_of_residence.value}
                            getValues={this.getValues}
                            reset={this.state.reset}
                        />
                        <SelectInput
                            id="role_id"
                            isLoading={this.state.rolesloading}
                            data={this.state.roles}
                            label="Type of Registration"
                            valueKeys={{ "value": "id", "label": "role" }}
                            value={this.state.config.role_id.value}
                            getValues={this.getValues}
                            reset={this.state.reset}
                        />


                        <button onClick={(e)=>{e.preventDefault(); this.register()}}className="bbhf_btn bbhf_btn_green" disabled={this.regState() || this.state.invalid}>
                            {this.state.loader? <span style={{display:"flex"}}><Loader />Processing</span>:
                            "Register"}</button>


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

if (document.getElementById('register')) {

    ReactDom.render(<Register />, document.getElementById('register'));
}