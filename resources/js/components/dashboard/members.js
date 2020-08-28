import React, { useState } from 'react'
import { head } from 'lodash'
import apiClient from '../axios'
import MUIDataTable from "mui-datatables";
import Loader, { Network, Head } from '../loader';
import Modal from '../modal'
import Toast from '../toast'
import Activity from '../reactact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faEnvelope, faPhoneAlt, faCheck, faUserTimes, faUserAltSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

let cancel;
let canceltoken = Axios.CancelToken

function Application_list(props){
    console.log(props)
    const [loaders,setloaders] = useState({Aload:false,Rload:false,loading:false,network:false})
  let  setApprove = async (id) => {
        let loader = id == 1 ? 'Aload' : 'Rload';
        await setloaders(prev=>({...prev, loading: true, [loader]: true }))
        let cred = {
            code: id,
            email: props.props.user.email
        }
        let response = await apiClient.sendPost(props.props.modalurl.approval, cred, 
            {  cancelToken:  new canceltoken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
            timeout: 10000})

        await props.activity.formend(response)
        if (response.code == 1) {
            await props.props.parent.reloadTable()
        } else {
            setloaders(prev=>({...prev, loading: false, [loader]: false }))
        }

    }
    return(
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




class ModalContent extends React.Component {
    componentDidMount() {

    }
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

    setApprove = async (id) => {
        let loader = id == 1 ? 'Aload' : 'Rload';
        await this.setState({ loading: true, [loader]: true })
        let cred = {
            code: id,
            email: this.props.user.email
        }
        let response = await apiClient.sendPost('/api/members/application/approve', cred)

        await this.activity.formend(response)
        if (response.code == 1) {
            await this.props.parent.reloadTable()
        } else {
            this.setState({ loading: false, [loader]: false })
        }

    }

   

    loadDetails = async () => {       
         let { email } = await this.props.user; 
        this.setState(this.default)
        let response = await apiClient.get(this.props.modalurl.userUrl + email, {
            cancelToken:  new canceltoken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
              }),
                timeout: 10000
 
         })
         if (response.code == 1){
            await this.setState({ details: response.message, loader: false, network: false })
  
         }else{
             this.setState({ details: this.defaults, loader: false, network: true })
         }
     

    }
  


    async componentDidUpdate(prevprops, prevstate) {
     
        if (this.props.open == false && prevprops.open != this.props.open) {
                
           await cancel()
           
      
        }

        let { email } =  this.props.user;
          if (email != '' && prevprops.user.email != this.props.user.email) {
          
            await this.loadDetails()
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
              
                       <Application_list details ={this.state.details} {...this} />
                }
            </>
        )
    }
}





export class Application extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: "Applicant Detail",
            user: {
                name: '',
                email: '',
                phone: ''

            },

        }
    }








    col = [
        {
            name: "first_name",
            label: 'First Name',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "other_name",
            label: 'Other Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "last_name",
            label: 'Last Name',
            options: {
                filter: true,
                sort: true
            }
        },

        {
            name: "email",
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "phone_number",
            label: 'Phone Number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "state_of_residence",
            label: 'State Of Residence',
            options: {
                filter: true,
                sort: true
            }
        },
    ];




    render() {
        return (
            <>
         
                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/members/application', title: 'Members Application' }]} />
                <TableWorker keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} options={this.options} col={this.col} modalTitle={this.state.modalTitle} ModalContent={ModalContent} modalurl={{'userUrl':'/api/members/application/','approval':'/api/members/application/approve'}}tableTitle="List" tableUrl='/api/members/application' />
            </>
        )
    }
}




export class MemberList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: "Member Information",
            user: {
                name: '',
                email: '',
                phone: ''

            },

        }
    }

    col = [
        {
            name: "first_name",
            label: 'First Name',
            options: {
                filter: true,
                sort: true,
                searchable: true
            }
        },
        {
            name: "other_name",
            label: 'Other Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "last_name",
            label: 'Last Name',
            options: {
                filter: true,
                sort: true
            }
        },

        {
            name: "email",
            label: 'Email',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "phone_number",
            label: 'Phone Number',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "state_of_residence",
            label: 'State Of Residence',
            options: {
                filter: true,
                sort: true
            }
        },
    ];




    render() {
        return (
            <>

                <Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: '/dashboard/in/members/application/list', title: 'Member List' }]} />
                <TableWorker keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }} user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }} options={this.options} col={this.col} modalTitle={this.state.modalTitle} ModalContent={ModalList} tableTitle="Members List" tableUrl='/api/members/list' />
            </>
        )
    }
}







export class TableWorker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            data: [

            ],
            open: false,
            modalTitle: this.props.modalTitle,
            user: this.props.user,
            toast: {
                show: false,
                color: '',
                title: '',
                message: ''
            }

        }
        this.defaults = this.state.user;
    }
    async componentDidUpdate(props, state) {

        if (!this.state.open && state.open != this.state.open) {
            await this.setState({ user: this.defaults });
        }
    }
    reloadTable = async () => {
        await this.setState({ loader: true })
        let response = await apiClient.get(this.props.tableUrl, { timeout: 50000 });
        if (response.code == 1) {
            await this.setState({ loader: false, data: response.message, open: false, network: false })
        } else {
            await this.setState({ loader: false, data: response.message, open: false, network: true })
        }
    }
    async componentDidMount() {

        await this.reloadTable();
    }

    options = {
        filterType: 'checkbox',
        search: true,
        selectableRows: 'none',
        onRowClick: async (i, v) => {
          
            let user = {}
            Object.keys(this.defaults).map(data => {

                user[data] = i[this.props.keys[data]]
            })
           
            await this.setState({
                open: true,
                user: user
            })
         
            //  setState({open:true})
        },
      

    };
    render() {
        return (
            <>
                <Modal parent={this} child={<this.props.ModalContent {...this.state} parent={this} modalurl={this.props.modalurl} />} />

                {this.state.loader ? <Loader /> : this.state.network ? <Network action={this.reloadTable} /> :
                    <MUIDataTable
                        title={this.props.tableTitle}
                        data={this.state.data}
                        columns={this.props.col}
                        options={this.options}
                    />}
            </>
        )
    }


}

class ModalList extends React.Component {
    componentDidMount() {

    }
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
            config: {
                id: '',
                email: '',
            },
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

    setApprove = async (id) => {
        let loader = id == 1 ? 'Aload' : 'Rload';
        await this.setState({ loading: true, [loader]: true })
        let cred = {
            code: id,
            email: this.props.user.email
        }
        let response = await apiClient.sendPost('/api/members/application/approve', cred)
 
        await this.activity.formend(response)
        if (response.code == 1) {
            await this.props.parent.reloadTable()
        } else {
            this.setState({ loading: false, [loader]: false })
        }

    }


    loadDetails = async () => {
        let { email } = await this.props.user;
        this.setState({
            loader: true, toast: {

                show: false,
                color: '',
                title: '',
                message: ''

            }, Aload: false, Rload: false, loading: false
        })
        let response = await apiClient.get('/api/members/list/' + email, {
            CancelToken: this.source.token,
            timeout: 10000

        })


        if (response.code == 1) {
            this.setState({ details: response.message, loader: false, network: false })
        } else {
            this.setState({ details: response.message, loader: false, network: true })
        }


    }
    canceltoken = Axios.CancelToken;
    source = this.canceltoken.source();

    async componentDidUpdate(prevprops, prevstate) {
      
        let { email } = await this.props.user;
        if (email != '' && prevprops.user.email != this.props.user.email) {
            await this.loadDetails()

        }

        if (this.props.open && prevprops.open != this.props.open) {
            this.source.cancel();
            await this.setState({
                loader: false, toast: {

                    show: false,
                    color: '',
                    title: '',
                    message: ''

                }, Aload: false, Rload: false, loading: false
            })
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
                    <div className="d-flex flex-column w-100 ">
                       
                       <div className=" w-100 d-flex justify-content-end align-items-center">
                                <button className="btn btn-danger mr-1" disabled={this.state.loading} onClick={() => this.setApprove(1)} >
                                    {this.state.Aload ? 'Please Wait..' : <span>REVOKE ACCESS<FontAwesomeIcon icon={faUserCheck} /></span>}
                                </button>

                            </div>
                        <div className="d-flex w-100   p-2">
                
                            <div className="w-25">
                            <img src={this.state.details.photo || '/images/default.png'} style={{ width: "100px", height: '100px' }} />
                        </div>
                            <div className="w-75 ">
                                {

                                    Object.keys(this.state.details).map((data, i) =>{
                                        if(data != 'photo'){
                                        return(
                                   
                                        <div className='pl-2 m-2 q' key={i}>
                                            <span>{data.split('_').join(' ').toUpperCase()}</span>
                                            <blockquote className="text-left  bg-quote p-1  m-1 ">
                                                {
                                                    this.state.details[data]
                                                }
                                            </blockquote>
                                        </div>
                                           
                                    )
                                }
                                    
                                        })}
                            </div>

                        </div>
                    </div>
                }
            </>
        )
    }
}