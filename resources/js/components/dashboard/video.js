


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

    let auth = () => {
        document.location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Ffresh-shrimp-23.loca.lt%2Fdashboard%2Fin%2Fmembers%2Fchat';
        fetch('https://zoom.us/oauth/authorize?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Ffresh-shrimp-23.loca.lt%2Fdashboard%2Fin%2Fmembers%2Fchat', {
            mode: 'no-cors',
            credentials: 'include',
            Origin: 'localhost:8000',
            method: 'get'

        }).then(resp => resp.text()).then(resp => console.log(resp))
    }

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
                            <CreateMeeting group={props.group} history={history} params={params} />
                        </Route>
                        <Route path={`${path}/video`}>
                            <JoinMeeting group={props.group} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    )

}


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
                description: {
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
                password: {
                    value: '',
                    state: false
                },
                agenda: {
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
    }

    async componentDidMount() {

        let arr = {}
     
        if (this.props.history.location.search) {
            let a = this.props.history.location.search.toString().split('?')[1].split('&')
            a.forEach(element => {

                let temp = element.split("=")
                arr[temp[0]] = decodeURIComponent(temp[1])
            });

            let newV = JSON.parse(arr.state)
            newV.code = arr.code

            await this.setState(newV)
           await  this.props.history.push(this.props.history.location.pathname)
            this.createmeeting()
        }else{
            fetch('https://worldtimeapi.org/api/timezone', {


                method: 'get',

            }).then(resp => {
                return resp.json()
            }).then(r => this.setState({ timezone: r ,timezoneloading:false}))
        }
        }
        authCreate = () => {
         Axios.post(
            'https://api.zoom.us/v2/users/chido.nduaguibe@gmail.com/meetings'
           ,{
               'authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiIwYzk3ODkyMy03NTFhLTRmODUtYjRlMi02ODg4MjY1MzZlOGIifQ.eyJ2ZXIiOjcsImF1aWQiOiJmMTBlM2MyMGJjZTkxNDM3Y2NmODkyZGQwMzgyNTQ2MSIsImNvZGUiOiJRelhlckJiZEFrX3pRNUdYenY3UmRpb0pxUkRLN3hBY1EiLCJpc3MiOiJ6bTpjaWQ6WHBOWmUxTGxRNWVUZHp4b28zN3BnIiwiZ25vIjowLCJ0eXBlIjowLCJ0aWQiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsInVpZCI6InpRNUdYenY3UmRpb0pxUkRLN3hBY1EiLCJuYmYiOjE1OTk1ODE2NjcsImV4cCI6MTU5OTU4NTI2NywiaWF0IjoxNTk5NTgxNjY3LCJhaWQiOiI3ZmFxZnVwNlNQSzE5emUtUDZPRFZ3IiwianRpIjoiZjU0Yjk5Y2EtMmIxNi00YmU0LWI3NzQtM2RkNzE3ZTVlOTllIn0.AdS7mtM47FJjrv1PaqsW_Pchqi55FUN481UHqncTz8Zz8Pbtz9U6DiEuaQOO0bNbfS2kLs6V1xlgPGxpLd05SA","token_type":"bearer","refresh_token":"eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiIxZTVkZmE4Yi00ODhhLTRmOGItOGVjNS00Y2QzNmJhOWMwNzQifQ.eyJ2ZXIiOjcsImF1aWQiOiJmMTBlM2MyMGJjZTkxNDM3Y2NmODkyZGQwMzgyNTQ2MSIsImNvZGUiOiJRelhlckJiZEFrX3pRNUdYenY3UmRpb0pxUkRLN3hBY1EiLCJpc3MiOiJ6bTpjaWQ6WHBOWmUxTGxRNWVUZHp4b28zN3BnIiwiZ25vIjowLCJ0eXBlIjoxLCJ0aWQiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsInVpZCI6InpRNUdYenY3UmRpb0pxUkRLN3hBY1EiLCJuYmYiOjE1OTk1ODE2NjcsImV4cCI6MjA3MjYyMTY2NywiaWF0IjoxNTk5NTgxNjY3LCJhaWQiOiI3ZmFxZnVwNlNQSzE5emUtUDZPRFZ3IiwianRpIjoiMzc4YzdiZDQtYmVlNi00YzI1LTk0YTQtMzY5M2UzZmVkN2QwIn0.AHmzqeYdNyhfCS8vfbKhSYNL9eQyEphOgfxIRuQ-DkCsK-yrLfx2PL4f6jqjUPru8sd0_lAGvsPa8Bt-ZhkGOw'
           }
         ).then(resp=>console.log(resp.data));
         return;
            let stat = {"config":this.state.config,"timezoneloading":this.state.timezoneLoading}
             document.location.href =`https://zoom.us/oauth/authorize?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Fbbhf.herokuapp.com%2Fchat%2Fmeeting&state=${encodeURIComponent(JSON.stringify(stat))}`;
          //  document.location.href = this.props.history.location.pathname + `?response_type=code&client_id=XpNZe1LlQ5eTdzxoo37pg&redirect_uri=https%3A%2F%2Fbbhf.herokuapp.com%2Fdashboard%2Fin%2Fmembers%2Fchat%2Fvideo&state=${encodeURIComponent(JSON.stringify(stat))}`;
        }

        createmeeting = async () => {


            let { topic, start_time, duration, timezone, agenda, settings } = this.state.config
            let $a = new Date(this.state.config.start_date.value + ' ' + this.state.config.start_time.value).toISOString()
            var password = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;

            for (var i = 0; i < charactersLength; i++) {
                password += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            let meetingObject = {
                "topic": topic.value,
                "type": 2,
                "start_time": $a,
                "duration": duration,
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
    let response = await apiClient.sendPost('/api/chat/meeting',{meetingObject,"code":this.state.code})
    console.log(response)
           // fetch('https://api.zoom.us/v2/users/chido.nduaguibe@gmail.com/meetings', {
            //    authorization: "Bearer "+ this.state.code,
             //   body: JSON.stringify(meetingObject),
            //    Origin: 'loalhost:8000',
           //     method: 'post'
       ///     }).then(resp => resp.json()).then(resp => console.log(resp))
          
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

                                <InputText
                                    type="text"
                                    id="description"
                                    label="Description (Optional)"
                                    value={this.state.config.description.value}
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
                                    isLoading={this.state.timezoneloading}
                                    data={this.state.timezone}
                                    label="Timezone"

                                    value={this.state.config.timezone.value}
                                    getValues={this.activity.getValues}
                                    reset={this.state.reset}
                                />


                                <button onClick={(e) => { e.preventDefault(); this.authCreate() }} className="bbhf_btn bbhf_btn_green" disabled={!this.activity.inputState() || this.state.invalid}>
                                    {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                        "Create Meeting"}</button>


                            </form>

                        </div>
                    </div>
                </>
            )
        }
    }


function JoinMeeting(props) {
    return (
        <>
            Create Meeting
        </>
    )
}