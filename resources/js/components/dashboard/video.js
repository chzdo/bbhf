


import React, { useState, Component, useEffect, useRef, useCallback, useContext } from 'react'


import Loader, { Network, Head } from '../loader';

import Provider from './usercontext';
import apiClient from '../axios';

import { data } from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPaperPlane, faPaperclip, faVideo, faUserFriends, faComment, faSpinner, faCheckDouble, faTimes, faFilePdf, faFileImage, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileVideo, faFileAlt, faDownload, faPhoneAlt, faEnvelopeOpen, faMapMarked } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route, history, withRouter, useLocation, useHistory, Router, Link, useRouteMatch, useParams } from 'react-router-dom'

import InputText, { SelectInput } from '../input'

import axios from 'axios'
import Toast from '../toast'

import Activity from '../reactact'
import Axios from 'axios';

export default function VideoComponent(props) {
    let { path, url } = useRouteMatch()
    let params = useParams()
    let history = useHistory()



    return (
        <>
            <div className="main-container">
                <div className="video-container">
                    <div className="met-menu">
                        <Link to={`${url}/create`} className="met-menu-links"> Create Meeting </Link>
                        <Link to={url} className="met-menu-links"> Join Meeting </Link>
                    </div>


                    <Switch>
                        <Route exact path={path}>
                            <JoinMeeting group={props.group} />
                        </Route>
                        <Route path={`${path}/create`}>
                            <CreateMeeting group={props.group} history={history} params={params} />

                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    )

}




const timezone = [
    {
    "id":'Pacific/Midway',
    "name":	'Midway Island, Samoa'
},  
 {
    "id":'Pacific/Pago_Pago',
    "name":	'Pago Pago'
},
{
    "id":'Etc/Greenwich',
    "name":	'Greenwich Mean Time'
},
{
    "id":'Africa/Casablanca',
    "name":	'Casablanca'
},  
 {
    "id":'Africa/Nouakchott',
    "name":	'Nouakchott'
},
{
    "id":'Africa/Bangui',
    "name":	'West Central Africa'
},
{
    "id":'Africa/Algiers',
    "name":	'Algiers'
},  
 {
    "id":'Africa/Cairo',
    "name":	'Cairo'
},
{
    "id":'Africa/Tripoli',
    "name":	'Tripoli'
},
{
    "id":'Africa/Nairobi',
    "name":	'Nairobi'
},  
 {
    "id":'Africa/Harare',
    "name":	'Harare, Pretoria'
},
{
    "id":'Africa/Tunis',
    "name":	'Tunis'
},
{
    "id":'Africa/Mogadishu',
    "name":	'Mogadishu'
},
{
    "id":'Africa/Djibouti',
    "name":	'Djibouti'
},  
 {
    "id":'Africa/Khartoum',
    "name":	'Khartoum'
},
{
    "id":'Africa/Johannesburg',
    "name":	'Johannesburg'
},

	
	
]


class CreateMeeting extends Component {
    constructor(props) {
        super(props)

        this.activity = new Activity(this)

        this.state = {
            loader: false,
            invalid: false,

            toast: {
                show: false,
                color: '',
                title: '',
                message: ''
            },
            config: {

                topic: {
                    value: '',
                    state: false
                },

                start_time: {
                    value: '',
                    state: false
                },
                start_date: {
                    value: '',
                    state: false
                },
                duration: {
                    value: '',
                    state: false
                },

                timezone: {
                    value: '',
                    state: false
                },


                settings: {
                    "host_video": true,
                    "participant_video": true,
                    "join_before_host": true
                }


            },
            timezone: [],
            timezoneLoading: true
        }
        this.default = this.state.config
    }

    async componentDidMount() {
  
        let arr = {}

        if (this.props.history.location.search) {
            let a = this.props.history.location.search.toString().split('?')[1].split('&')
            a.forEach(element => {

                let temp = element.split("=")
                arr[temp[0]] = temp[1]
            });


            if (arr.code == 0) {

                await this.activity.formend({ 'code': 0, 'message': atob(arr.q) })

            } else {
                this.activity.formend({ 'code': 1, 'message': "Meeting Created with id " + arr.q })

            }

            await this.props.history.push(this.props.history.location.pathname)

        }



    }
    authCreate = () => {
        this.setState({ loader: true, invalid: true })
        let { topic, start_time, duration, timezone, agenda, settings } = this.state.config
        let $a = new Date(this.state.config.start_date.value + 'T' + this.state.config.start_time.value)
        var password = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for (var i = 0; i < 6; i++) {
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        let meetingObject = {
            "topic": topic.value,
            "type": 2,
            "start_time": $a,
            "duration": duration.value,
            "timezone": timezone.value,
            "password": password,
            "agenda": "",
            "settings": {
                "host_video": true,
                "participant_video": true,
                "join_before_host": true,
                "mute_upon_entry": false,
                "registrants_email_notification": true
            }
        }
        let stat = meetingObject
        console.log(stat)
        stat.group = this.props.group
        stat.url = this.props.history.location.pathname
        document.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Fbbhf.herokuapp.com%2Fchat%2Fmeeting&state=${encodeURIComponent(JSON.stringify(stat))}`;
        //  document.location.href = this.props.history.location.pathname + `?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Fbbhf.herokuapp.com%2Fdashboard%2Fin%2Fmembers%2Fchat%2Fvideo&state=${encodeURIComponent(JSON.stringify(stat))}`;
    }


    render() {
        return (
            <>
                <div className="create-cont">
                    <div className="login-container" style={{ borderRadius: '0px', padding: '2%' }}>
                        <Toast

                            show={this.state.toast.show ? "show" : ''}
                            color={this.state.toast.color}
                            title={this.state.toast.title}
                            message={this.state.toast.message}
                            cleanToast={this.activity.cleanToast}
                        />

                        <strong> Create Meeting</strong>
                        <hr></hr>
                        <form className="form" >
                            <InputText
                                type="text"
                                id="topic"
                                label="Topic"
                                value={this.state.config.topic.value}
                                getValues={this.activity.getValues}
                                constraint={{ required: true }}
                                reset={this.state.reset}
                            />


                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <InputText
                                    type="date"
                                    id="start_date"
                                    label="Start Date"
                                    value={this.state.config.start_date.value}
                                    getValues={this.activity.getValues}
                                    constraint={{ required: true }}
                                    reset={this.state.reset}
                                />
                                <InputText
                                    type="time"
                                    id="start_time"
                                    label="Start Time"
                                    value={this.state.config.start_time.value}
                                    getValues={this.activity.getValues}
                                    constraint={{ required: true }}
                                    reset={this.state.reset}
                                />
                            </div>
                            <InputText
                                type="number"
                                id="duration"
                                label="Duration (mins)"
                                value={this.state.config.duration.value}
                                getValues={this.activity.getValues}
                                constraint={{ required: true, max: 40, number: true }}
                                reset={this.state.reset}
                            />

                            <SelectInput
                                id="timezone"
                                isLoading={false}
                                data={timezone}
                                label="Timezone"
                                valueKeys = {{label:'name', value:'id'}}
                                value={this.state.config.timezone.value}
                                getValues={this.activity.getValues}
                                reset={this.state.reset}
                            />


                            <button onClick={(e) => { e.preventDefault(); this.authCreate() }} className="bbhf_btn bbhf_btn_green" disabled={this.activity.inputState() || this.state.invalid}>
                                {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                    "Create Meeting"}</button>


                        </form>

                    </div>
                </div>
            </>
        )
    }
}


function JoinMeeting({ group }) {

    function Meeting({topic , start_time, duration, meeting_id,group, password}) {

       let {first_name, last_name, email ,role_id} = useContext(Provider)
        let role = role_id == 4 ? 1:0
        let { path, url } = useRouteMatch()
        let params = {f:first_name,l:last_name,email:email,mid:meeting_id,role:role,pwd:password,url:url}
        return (
            <>
                <div className="meeting-cont">
                    <div className="m-group">
                        <span className="topic ">{topic} </span>
                        <span className="time">{start_time}</span>
                        <span className="duration" >{`${duration} mins`}</span>
                    </div>
                    <div className="m-group">
                      <a href={`/dashboard/video?${btoa(JSON.stringify(params))}`} className="a btn btn-warning">Join meeting</a>
                      
                    </div>
                </div>

                
            </>
        )
    }
const [meetings,setMeeting] = useState([])
const [network,setNetwork] = useState(false)
const [loading,setLoading] = useState(true)
    useEffect(() => {
        let cancel
        Axios.get('/api/video/meetings', {
            cancelToken: new Axios.CancelToken(e => cancel = e),
            params: {
                "group": group
            }
        }).then(resp => {
            setLoading(false)
            if (resp.data.code == 1) {
                setMeeting(resp.data.message)

                setNetwork(false)
            } else {
                setNetwork(true)
            }
        }
        )

        return () => cancel()
    }, [group])
    return (
        <>

        
            <div className="meetlist" >
            {loading ? <span className="w-100 d-flex justify-content-center align-items-center text-white"><Loader  /></span> : network ? <Network action={f} /> :
		  <div className="meetlist-inner">
                {meetings.map((data,i)=><Meeting key={i} {...data}  />)}
                </div>

    }
            </div>
        </>
    )
}