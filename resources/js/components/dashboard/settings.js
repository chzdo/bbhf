import React from 'react'
import ReactDom from 'react-dom'
import InputText from '../input'

import Provider from './usercontext';
import { SelectInput } from '../input'
import Toast from '../toast'
import Activity from '../reactact'
import { faFileUpload, faTruckMonster, faMoneyCheckAlt, faMoneyCheck, faUserEdit, faEnvelope, faUserAlt, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import apiClient from '../axios'
import Loader, { Head, Network, NotFound } from '../loader'
import { CenterFocusStrong } from '@material-ui/icons'
import Axios from 'axios';
export class UserPassword extends React.Component {

    constructor(props) {
        super(props)
        this.activity = new Activity(this)
        this.state = {
            invalid: false,
            loader: false,
            toast: {
                show: false,
                color: '',
                title: '',
                message: '',

            },
            config: {
                oldpassword: {
                    value: '',
                    state: false
                },
                password: {
                    value: '',
                    state: false
                },
                repassword: {
                    value: '',
                    state: false
                },

            }
        }
        console.log(props)
        this.default = this.state.config
    }

    componentDidMount() {

    }

    reset = async () => {
        this.setState({ loader: true, invalid: true });
        let cred = {
            newpassword: this.state.config.password.value,
            oldpassword: this.state.config.oldpassword.value

        }
        let response = await apiClient.sendPost('/api/users/password', cred)

        await this.activity.formend(response);
    }
    render() {
        return (
            <>
                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/users/password`, title: 'Update Password' }]} />

                <div className="create-cont-inner bg-white h-100">
                    <div className="" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', background: 'white', alignItems: 'center' }}>
                        <Toast

                            show={this.state.toast.show ? "show" : ''}
                            color={this.state.toast.color}
                            title={this.state.toast.title}
                            message={this.state.toast.message}
                            cleanToast={this.activity.cleanToast}
                        />
                        <h4><strong> Reset Password</strong></h4>
                        <hr></hr>
                        <form className="p-form" >

                            <InputText
                                type="password"
                                id="oldpassword"
                                label="Old Password"
                                value={this.state.config.oldpassword.value}
                                getValues={this.activity.getValues}
                                constraint={{ required: true }}
                                reset={this.state.reset}
                            />
                            <InputText
                                type="password"
                                id="password"
                                label="New Password"
                                value={this.state.config.password.value}
                                getValues={this.activity.getValues}
                                constraint={{ required: true, min: 8 }}
                                reset={this.state.reset}
                            />

                            <InputText
                                type="password"
                                id="repassword"
                                label="Re-Type Password"
                                value={this.state.config.repassword.value}
                                getValues={this.activity.getValues}
                                mainpassword={this.state.config.password.value}
                                constraint={{ required: true, min: 8, repassword: true }}
                                reset={this.state.reset}
                            />
                            <button onClick={(e) => { e.preventDefault(); this.reset() }} className="bbhf_btn bbhf_btn_green" disabled={this.activity.inputState() || this.state.invalid}>
                                {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                    "Reset Password"}</button>



                        </form>

                    </div>
                </div>
            </>
        )
    }
}











export class UserProfile extends React.Component {
    static contextType = Provider;
    constructor(props) {
        super(props)
        this.activity =  new Activity(this)
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
                    state: true
                },
                other_name: {
                    value: '',
                    state: true
                },
                last_name: {
                    value: '',
                    state: true
                },
               
                phone_number: {
                    value:'',
                    state:true
                },
                state_of_residence: {
                    value:  '',
                    state: true
                },
                state_of_origin: {
                    value: '',
                    state: false
                },
                address: {
                    value: '',
                    state: false
                },
                photo: {
                    value: '',
                    state: false
                },

            },
            user_role:''
        
        }
        this.default = this.state.config
    }

  async   componentDidMount() {
    let   config= {

        first_name: {
            value: this.context.first_name,
            state: true
        },
        other_name: {
            value: this.context.other_name,
            state: true
        },
        last_name: {
            value: this.context.last_name,
            state: true
        },
       
        phone_number: {
            value:this.context.phone_number,
            state:true
        },
        state_of_residence: {
            value:  this.context.state_of_residence,
            state: true
        },
        state_of_origin: {
            value: this.context.state_of_origin || '',
            state: false
        },
        address: {
            value: this.context.address || '',
            state: true
        }

    }

    this.setState({config:config})
    console.log(this.context)
        let states = await axios.all([axios.get('http://locationsng-api.herokuapp.com/api/v1/states'),
        axios.get('/api/roles')]);;
      
        let response = await states;
        let roles = {};
        if (response[1].data.code == 1) {
            roles = response[1].data.message;
        }
       
       await  this.setState(prev => ({
            ...prev, stateloading: false, rolesloading: false, states: response[0].data, roles: roles, user_role: roles[this.context.role_id-1].role
       }))
    }
    register = async (e) =>{
        await this.setState({loader:true,invalid:true})
        let {first_name,other_name,last_name,phone_number,state_of_residence,state_of_origin,address} = this.state.config
        let cred = {
          first_name:first_name.value,
          other_name:other_name.value,
          last_name:last_name.value,
          phone_number:phone_number.value,
          state_of_residence:state_of_residence.value,
          address:address.value,
          state_of_origin:state_of_origin.value,
        }
          let register = await  apiClient.sendPost('/api/users/profile',cred)
      
        if (register.code == 1){
       await this.context.update(register.payload)
        }
          this.setState({
                toast: {
                show: true,
                color: register.code == 1 ? 'toastGreen' : 'toastRed',
                title: register.code == 1 ? 'Success' : 'Failure',
                message: response.message,

            }
            ,
            loading:false,

          })
          ///await  this.activity.formend(register)  ;
      
      
          
      }
      
  
    render() {
        return (
            <>
                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/users/profile`, title: 'Update Profile' }]} />

                <div className="create-cont-inner bg-white h-100">
                <div className="d-flex p-3 justify-content-around text-white" style={{ background: 'rgba(250, 119, 11,10.5)' }}>
                                        <span><FontAwesomeIcon icon={faEnvelope} />   {this.context.email}</span>
                                        <span><FontAwesomeIcon icon={faUserAlt} />   {this.context.user_number}</span>
                                        <span><FontAwesomeIcon icon={faUserCog} />   {this.state.user_role}</span>
                                     

                                   
                                    </div>
                    <div className="" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', background: 'white', alignItems: 'center' }}>
                        <Toast

                            show={this.state.toast.show ? "show" : ''}
                            color={this.state.toast.color}
                            title={this.state.toast.title}
                            message={this.state.toast.message}
                            cleanToast={this.activity.cleanToast}
                        />
                        <h4><strong> Update Profile</strong></h4>
                        <hr></hr>
                        <div className="project-cont" style={{ borderRadius: '0px', padding: '2%' ,justifyContent:'center'}}>
                            <form className="p-form" >

                        <InputText
                            type="text"
                            id="first_name"
                            label="First Name"
                            value={this.state.config.first_name.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="text"
                            id="other_name"
                            label="Other Name"
                            value={this.state.config.other_name.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                        <InputText
                            type="text"
                            id="last_name"
                            label="Last Name"
                            value={this.state.config.last_name.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />
                     
                        <InputText
                            type="number"
                            id="phone_number"
                            label="Phone Number"
                            value={this.state.config.phone_number.value}
                            getValues={this.activity.getValues}
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
                            getValues={this.activity.getValues}
                            reset={this.state.reset}
                        />
                         <SelectInput
                            id="state_of_origin"
                            isLoading={this.state.stateloading}
                            data={this.state.states}
                            label="state of origin"
                            valueKeys={{ "value": "name", "label": "name" }}
                            value={this.state.config.state_of_origin.value}
                            getValues={this.activity.getValues}
                            reset={this.state.reset}
                        />
                           <InputText
                            type="text"
                            id="address"
                            label="Address"
                            value={this.state.config.address.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true }}
                            reset={this.state.reset}
                        />


                        <button onClick={(e)=>{e.preventDefault(); this.register()}}className="bbhf_btn bbhf_btn_orange" disabled={this.activity.inputState() || this.state.invalid}>
                            {this.state.loader? <span style={{display:"flex"}}><Loader />Processing</span>:
                            "Update"}</button>



                            </form>
                            <div className="p-image" style={{ width: '20%' }}>
                                <img src={this.state.photoAPI? '/images/loading.png' :this.context.photo || '/images/default.png'} className="profile-pix" style={{ width: '100px', height: '100px' }} onClick={() => this.image.click() }  />
                      
                                        <input ref={e => this.image = e} type='file' hidden onChange={async (event) => {
                                            event.persist()
                                          if (cancel != undefined)  cancel()
                                            if (!event.target.files[0].type.includes('image')) {
                                                this.setState({ imgerr: true, imgerrmsg: "invalid picture format" })
                                                return
                                            }
                                            if (event.target.files && event.target.files[0]) {
                                                let image = new Image();
                                                this.setState({photoAPI: true})
                                                image.src = URL.createObjectURL(event.target.files[0])
                                                let formD = new FormData();
                                                formD.append('photoimage', event.target.files[0]);
                                           let response =     await    apiClient.sendPost('/api/users/profile/photo',formD,{
                                               cancelToken : new Axios.CancelToken(c=>cancel = c)
                                           })
                                         
                                         
                                               if (response == undefined ) return;
                                            response.code == 1 &&    await  this.context.update(response.payload)
                                            this.setState({photoAPI: false})

                                            }
                                        }
                                        }
                                        />
                         
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


let cancel;