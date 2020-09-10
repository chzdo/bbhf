import React, { useState, useEffect, useRef } from 'react'
import Toast from './toast'
import Loader, { Network, Head } from './loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faEnvelope, faPhoneAlt, faCheck, faUserTimes, faUserAltSlash, faUserCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Activity from './reactact';
import Axios from 'axios'
import apiClient from './axios'
import { SelectInput } from './input'
let cancel;
let canceltoken = Axios.CancelToken


export default function Modal(props) {
    const [open, setOpen] = useState(props.parent.state.open)
    useEffect(() => {
        setOpen(props.parent.state.open)
    }, [props.parent.state.open])

    return (

        <div className={`${'modal-overlay'} ${open ? 'open-dialog' : ''}`}>
            <div className={`${'modal-container'} ${open ? 'open-dialog' : ''}`}>

                <div className="modal-body">
                    <div className="modal-head ">
                        <div className="modal-title">
                            {props.parent.state.modalTitle}
                        </div>
                        <div className="modal-close" onClick={async () => {
                            await props.parent.setState({ open: false })

                        }}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </div>
                    <hr />
                    <div className="modal-content">
                        {props.child}
                    </div>
                </div>
            </div>
        </div>
    )
}



export function Application_list(props) {

    const [loaders, setloaders] = useState({ Aload: false, Rload: false, loading: false, network: false })
    let setApprove = async (id) => {
        let loader = id == 1 ? 'Aload' : 'Rload';
        await setloaders(prev => ({ ...prev, loading: true, [loader]: true }))
        let cred = {
            code: id,
            email: props.props.user.email
        }
        let response = await apiClient.sendPost(props.props.modalurl.approval, cred,
            {
                cancelToken: new canceltoken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                })
            })

        await props.activity.formend(response)
        if (response.code == 1) {
            await props.props.parent.reloadTable()
        } else {
            setloaders(prev => ({ ...prev, loading: false, [loader]: false }))
        }

    }
    return (
        <>

            <div className="d-flex flex-column p-2">
                <div className=" w-100 d-flex justify-content-end align-items-center">
                    <button className="btn btn-primary mr-1" disabled={loaders.loading} onClick={() => setApprove(1)} >
                        {loaders.Aload ? 'Please Wait..' : <span>Approve <FontAwesomeIcon icon={faUserCheck} /></span>}
                    </button>
                    <button className="btn btn-danger mr-2" disabled={loaders.loading} onClick={() => setApprove(2)}>
                        {loaders.Rload ? 'Please Wait..' : <span> Reject <FontAwesomeIcon icon={faUserTimes} /></span>}
                    </button>
                </div>
                <div className='pl-2 m-2 q'>
                    <span>Why do you want to join BBHF?</span>
                    <blockquote className="text-left  bg-quote p-1  m-1 ">
                        {props.details.reason}
                    </blockquote>
                </div>
                <div className='pl-2 m-2  q'>
                    <span>Can you tell us about yourself?</span>
                    <blockquote className=" text-left p-1  bg-quote m-1 text-white">
                        {props.details.about}
                    </blockquote>
                </div>
                <div className='pl-2 m-2  q'>
                    <span>What do you think you can bring in to BBHF if given the opportunity?</span>
                    <blockquote className=" text-left p-1  bg-quote m-1 text-white">
                        {props.details.contribute}
                    </blockquote>
                </div>
                <div className='pl-2 m-2  q'>
                    <span>Can you tell us about your strength as an individual?</span>
                    <blockquote className="text-left p-1  bg-quote m-1 text-white">
                        {props.details.strength}
                    </blockquote>
                </div>
                <div className='pl-2 m-2  q'>
                    <span>The leadership structure of BBHF is such that the leadera are elected into any of the offices of the board of directors or appointed as cordinators of our various volunteers communities axis or elected as chairperson or members of our foundation's various projects to humanity. Wil you be willing and ready to accept such leadership responsibility when given such opportuinity to serve?</span>
                    <blockquote className="text-left p-1  bg-quote m-1 text-white">
                        {props.details.leadership}
                    </blockquote>
                </div>
            </div>

        </>
    )
}


export class ModalContent extends React.Component {


    constructor(props) {
        super(props)
        this.activity = new Activity(this);
        this.state = {
            network: false,
            details: {
                reason: '',
                about: '',
                contribute: '',
                strength: '',
                leadership: ''
            },
            loader: true,

            toast: {
                show: false,
                color: '',
                title: '',
                message: ''
            },
            Aload: false,
            Rload: false,
            loading: false

        }
        this.default = this.state

    }





    loadDetails = async () => {
        let { email } = await this.props.user;
        this.setState(this.default)
        let response = await apiClient.get(this.props.modalurl.userUrl + email, {
            cancelToken: new Axios.CancelToken(c=>cancel = c)
              ,
            timeout: 20000

        })
        if (response.code == 1) {
            await this.setState({ details: response.message, loader: false, network: false })

        } else {
            this.setState({ details: this.defaults, loader: false, network: true })
        }


    }


    async componentDidUpdate(prevprops, prevstate) {

        if (this.props.open == false && prevprops.open != this.props.open) {

            await cancel()

        }

        let { email } = this.props.user;
        if (email != '' && prevprops.user.email != this.props.user.email) {

            await this.loadDetails()
        }
    }
componentWillUnmount(){
    if (cancel !== undefined) {
        cancel();
      }
}

    render() {
        let { first_name, other_name, last_name, email, phone } = this.props.user
        return (
            <>
                <Toast

                    show={this.state.toast.show ? "show" : ''}
                    color={this.state.toast.color}
                    title={this.state.toast.title}
                    message={this.state.toast.message}
                    cleanToast={this.activity.cleanToast}
                />
                <div className="d-flex justify-content-between flex-wrap">
                    <span>
                        <FontAwesomeIcon icon={faUserAlt} />
                        <span> {first_name + ' ' + other_name + ' ' + last_name}</span>

                    </span>
                    <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span> {email}</span>

                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                        <span> {phone}</span>

                    </span>
                </div>
                {this.state.loader ? <Loader /> : this.state.network ? <Network action={this.loadDetails} /> :

                    <this.props.modal_child details={this.state.details} {...this} />
                }
            </>
        )
    }
}



export function List(props) {
    const [loaders, setloaders] = useState({ Aload: false, Rload: false, loading: false, network: false, role:''})
    const [role, setRole] = useState('');
    const [roleloading, setroleloading] = useState(true);
    const [roles, setRoles] = useState([])
    const [access, setAccess] = useState(null)
    let getroles = async () => {
        let a = await Axios.all([Axios.get('/api/roles'),Axios.get('/api/users/status',{params:{email:props.props.user.email}})])
      
        let resp = await a
      
        resp[0].data.code == 1 && setRoles(resp[0].data.message)    
    
        resp[1].data.code == 1 && setAccess(resp[1].data.message)
        setroleloading(false)
}

if (roles.length == 0 && access == null) {
    getroles()
}



let roleref = useRef(null)

let revoke = async (id) => {

    setloaders(prev => ({ ...prev, loading: true, Aload: true, Rload: true }))
    let cred = {
        email: props.props.user.email,
        code : access == 1 ? 0 : 1
    }
    let response = await apiClient.sendPost(props.props.modalurl.revoke, cred,
        {
            cancelToken: new canceltoken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        })

    await props.activity.formend(response)
response.code == 1 && setAccess(cred.code)
    setloaders(prev => ({ ...prev, loading: false, Aload: false, Rload: false }))


}
let val;
let changeRole = async (e, i) => {
 
    val = e.target.value;
   
   await setloaders(prev => ({ ...prev, loading: true, Rload: true, role:val }))
    if (i) {
       
 
     
        let resp = await apiClient.sendPost(props.props.modalurl.update, {
            email: props.details.email,
            role_id: val
        }, {
            cancelToken: new canceltoken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        })

        props.activity.formend(resp)
        if (resp.code == 1) {
            await props.props.parent.reloadTable()
        } else{
        setloaders(prev => ({ ...prev, loading: false, Rload: false, role:'' }))
        }
    }
}

return (

    <div className="d-flex flex-column w-100 ">
{ roleloading? <Loader   /> :
        <div className="list-btn-cont">
            <button className={`btn ${access==1?'btn-danger': 'btn-success'}  list-btn-item`} disabled={loaders.loading} onClick={revoke}  >
                {loaders.Aload ? 'Please Wait..' : access == 1 ? <span>REVOKE ACCESS <FontAwesomeIcon icon={faUserTimes} /></span> : <span>RESTORE ACCESS <FontAwesomeIcon icon={faUserCheck} /></span>}
            </button>
            {loaders.Rload ? 'Please Wait..' :
                <div className="list-btn-item">
                    <SelectInput
                        id="role_id"
                        ref={roleref}
                        isLoading={roleloading}
                        data={roles}
                        label="Change Role"
                        valueKeys={{ "value": "id", "label": "role" }}
                        value={loaders.role}
                        getValues={changeRole}
                        disabled={loaders.loading}

                    />
                </div>
            }
        </div>
}
        <div className="d-flex w-100   p-2">

            <div className="w-25 pl-1 pr-1">
                <img src={props.details.photo || '/images/default.png'} className='profile-resize' />
            </div>
            <div className="w-75 ">
                {

                    Object.keys(props.details).map((data, i) => {
                        if (data != 'photo') {
                            return (

                                <div className='pl-2 m-2 q' key={i}>
                                    <span>{data.split('_').join(' ').toUpperCase()}</span>
                                    <blockquote className="text-left  bg-quote p-1  m-1 ">
                                        {
                                            props.details[data]
                                        }
                                    </blockquote>
                                </div>

                            )
                        }

                    })}
            </div>

        </div>
    </div>

)
}