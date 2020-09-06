import React, { useState, Component, useEffect, useRef, useCallback, useContext } from 'react'

import Modal, { Application_list, ModalContent, List } from '../modal'
import Loader, { Network, Head } from '../loader';
import { TableWorker } from '../table'
import Provider from './usercontext';
import MessageComponent from './chat'
import VideoComponent from './video'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPaperPlane, faPaperclip, faVideo, faUserFriends, faComment, faSpinner, faCheckDouble, faTimes, faFilePdf, faFileImage, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileVideo, faFileAlt, faDownload, faPhoneAlt, faEnvelopeOpen, faMapMarked } from '@fortawesome/free-solid-svg-icons';


import { Switch, Route, history, withRouter, useLocation, useHistory, Router, Link, useRouteMatch, useParams } from 'react-router-dom'




export function ApplicationComponent(props) {




	return (
		<>
			<Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/${props.routeType}/application`, title: `${props.routeTitle} Application` }]} />
			<div className="scroll-content">
				<TableWorker
					keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }}
					user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }}
					col={col} modalTitle={`'${props.routeTitle} Information'`}
					ModalContent={ModalContent}
					modal_child={Application_list}
					modalurl={{ 'userUrl': `/api/${props.routeType}/application/`, 'approval': `/api/${props.routeType}/application/approve` }}
					tableTitle="Application List"
					tableUrl={`/api/${props.routeType}/application`} />
			</div>

		</>
	)

}




const col = [
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



export function ListComponent(props) {


	return (
		<>

			<Head crumb={[{ route: '/dashboard/in', title: 'Home' }, { route: `/dashboard/in/${props.routeType}/application/list`, title: `${props.routeTitle} List` }]} />
			<div className="scroll-content">
				<TableWorker
					keys={{ first_name: 0, other_name: 1, last_name: 2, email: 3, phone: 4 }}
					user={{ email: '', phone: '', first_name: '', other_name: '', last_name: '' }}
					col={col} modalTitle={`${props.routeTitle} Information`}
					ModalContent={ModalContent}
					modal_child={List}
					modalurl={{ 'userUrl': `/api/${props.routeType}/list/`, 'revoke': `/api/${props.routeType}/revoke`, 'update': `/api/${props.routeType}/update` }}
					tableTitle="Volunteers List"
					tableUrl={`/api/${props.routeType}/list`} />
			</div>
		</>
	)

}





function ChatComponent(props) {
	let context = useContext(Provider)
	console.log(props.history.location)
	let { path, url } = useRouteMatch();
	return (
		<>
			<div className="chat-container">
			<header className='chat-header'>
				<img src={context.photo || '/images/default.png'} alt="" className="chat-image" />

				<h2 className="chat-title">BBHF Member Chat Group</h2>

				<div className="chat-menu">
					<Link to={`${url}/video`}> <span className="text-primary m-1" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faVideo} /> </span></Link>
					<span className="text-warning m-1 " style={{ cursor: 'pointer' }} ><Link to={`${url}`}> <FontAwesomeIcon icon={faComment} /> </Link></span>
					<span className="text-warning m-1 small-toggle" style={{ cursor: 'pointer' }} onClick={() => this.setState({ aside: !this.state.aside })}> <FontAwesomeIcon icon={faUserFriends} /> </span>
				</div>
			</header>

			<Switch>
				<Route exact path={path}>
					<MessageComponent  group={props.group}/>
				</Route>
				<Route path={`${path}/video`}>
					<VideoComponent  group={props.group}/>
				</Route>
			</Switch>
			</div>
		</>
	)
}



export default withRouter(ChatComponent)

