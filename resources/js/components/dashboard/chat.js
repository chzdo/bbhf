


import React, { useState, Component, useEffect, useRef, useCallback, useContext } from 'react'


import Loader, { Network, Head } from '../loader';

import Provider from './usercontext';
import apiClient from '../axios';

import { data } from 'jquery';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPaperPlane, faPaperclip, faVideo, faUserFriends, faComment, faSpinner, faCheckDouble, faTimes, faFilePdf, faFileImage, faFile, faFileExcel, faFileWord, faFilePowerpoint, faFileVideo, faFileAlt, faDownload, faPhoneAlt, faEnvelopeOpen, faMapMarked } from '@fortawesome/free-solid-svg-icons';




let cancel;

let channel;
function SendMessage({ message, setMessage, context, group }) {

	const [fs, setFs] = useState({ file: {}, drawer: false })
	const [ms, setMs] = useState('')
	let fileInput = useRef(null)


	const getIcon = (file) => {
		if (file.type != undefined) {
			if (file.type.includes('image')) {
				return faFileImage
			} else if (file.type.includes('application')) {
				var type = file.type.split('/');
				if (type.includes('pdf')) {
					return faFilePdf
				} else if (type.includes('excel')) {
					return faFileExcel
				} else if (type.includes('office')) {
					return faFileWord
				} else if (type.includes('point')) {
					return faFilePowerpoint
				}
			} else if (file.type.includes('video')) {
				return faFileVideo
			}
		}
		return faFileAlt
	}


	const sendMessage = async (e, payload, type) => {
		e.preventDefault();
		var newMe = {
			message: type == 0 ? payload : payload.name,
			created_at: (new Date()),
			user: context,
			sendStatus: 0,
			id : message[0].id + 1,
			sendCode: message[0].id + 1,
			type: type
		}

		message.push(newMe)
		let k = Object.values(message).sort((a, b) => b.id - a.id)

		var form = new FormData()
		form.append('user', context)
		form.append('code', newMe.sendCode)
		form.append('type', type)
		form.append('group', group)

		var label = type == 1 ? 'file' : 'message'
		form.append(label, payload)

		type == 1 ? await setFs({ file: {}, drawer: false }) : await setMs('')
		
		
		await setMessage(k)



		let response = await apiClient.sendPost('/api/chat/message', form, {
			headers: {
				Accept: 'multipart/form-data'
			},
			cancelToken: new Axios.CancelToken(e=> cancel = e)})
	
			let message_ =k
		
	
			let obj = Object.values(k).filter(e=>{
				if(e.sendCode == response.message ){
					if (response.code == 1){
					e.sendStatus = 1
					e.filepath = response.payload
					}else{
						e.sendStatus = 2
					}
				}
				return e
			})
	

		await setMessage(obj)

	}

	useEffect(()=>{
		return ()=> cancel()
	},[])
	return (
		<footer >
			<div className={`${fs.drawer ? 'opendrawer' : ''} file-drawer`}>
				<div className='file-drawer-cont'>
					<span className='d-flex justify-content-center align-items-center' onClick={() => setFs({ file: {}, drawer: false })}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
					<span className='d-flex justify-content-center align-items-center '>
						<FontAwesomeIcon icon={getIcon(fs)} /> {fs.file.name == undefined ? null : fs.file.name}
					</span>
					<span className='d-flex justify-content-center align-items-center' onClick={(e) => sendMessage(e, fs.file, 1)}>
						<FontAwesomeIcon icon={faPaperPlane} />
					</span>
				</div>
			</div>
			<span onClick={() => fileInput.click()}><input onChange={(e) => setFs({ file: e.target.files[0], drawer: true })} type='file' hidden ref={(el) => fileInput = el} /> <FontAwesomeIcon icon={faPaperclip} /></span>
			<textarea value={ms} onChange={(e) => setMs(e.target.value)} placeholder="Type your message"></textarea>
			<a onClick={(e) => sendMessage(e, ms, 0)}> <FontAwesomeIcon icon={faPaperPlane} /></a>
		</footer>
	)



}


const getDate = (d) => {
	var time;
	var da = new Date(d);
	var msDiff = new Date().getTime() - da.getTime()   //Future date - current date
	var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
	if (daysTill30June2035 <= 0) {
		time = 'today'
	} else if (daysTill30June2035 == 1) {
		time = 'yesterday'
	} else {
		time = daysTill30June2035 + 'days ago'
	}
	return time + ' ' + da.getHours() + ' : ' + (da.getMinutes() <= 9 ? ('0' + da.getMinutes()) : da.getMinutes())
}




function ChatMessage({ callback, message, email, loading, network, current, next_page_url, setUrl, scroll, setScroll, shouldScroll, setshouldScroll }) {

	const [element, setElement] = useState(null)

	let bottom = useRef(null)

	useEffect(() => {

		if (!scroll) return

		bottom.scrollIntoView({ behavior: 'smooth' })

	}, [scroll])

	function handleChange(e) {
		let { scrollTop, clientHeight, scrollHeight } = e.currentTarget


		if (Math.round(scrollHeight - scrollTop) == clientHeight) {

			setScroll()
		}

	}
	let observe = useRef()

	let c;



	const firstElement = useCallback(node => {
		if (loading) return
		if (observe.current) {
			observe.current.disconnect()
		}
		observe.current = new IntersectionObserver(entry => {

			if (entry[0].isIntersecting && next_page_url != null) {
				setUrl()


			}
		})

		if (node) observe.current.observe(node)
	});



	return (
		<>
		{loading ? <span className="d-flex w-100 justify-content-center align-items-center">Loading...</span> : network ? <Network action={callback} /> : null}

		<ul id="chat" onScroll={handleChange} ref={r => c = r} >
				{Object.keys(message).map((data, i) => {
				if (message.length == i + 1) {
					return <li ref={firstElement} className={`chat-holder ${message[data].user.email == email ? 'me' : 'you'} `} key={i}>
						<div className="cih">
							<div className="entete">
								<h2>{message[data].user.first_name}</h2>
								<h3>
									{
										getDate(message[data].created_at)
									}
								</h3>
							</div>
							<div className="chatbox">
								<div className="chat-info">
								<div className="message">
									<p class="main-message">{message[data].message}</p>	
										{
											message[data].type != 1 ? null : <a className='dwl'  href={message[data].payload} target='_blank'><FontAwesomeIcon icon={faDownload} />  </a>
										}
									</div>
								</div>
								<img src={message[data].user.photo || 'images/default.png'} alt="" className="chat-img" />
							</div>
							{message[data].user.email == email ?
								<div className='sending'>
									{
										message[data].sendStatus !== undefined ?
											message[data].sendStatus == 0 ?
												<span>Sending   <FontAwesomeIcon icon={faSpinner} /></span> :
												message[data].sendStatus == 1 ?
													<span className="text-success">sent  <FontAwesomeIcon icon={faCheckDouble} /></span>
													:
													<span className="text-danger">Failed  <FontAwesomeIcon icon={faTimes} /> </span>
											: <span className="text-success">sent  <FontAwesomeIcon icon={faCheckDouble} /></span>
									}

								</div> : null}

						</div>

					</li>

				} else {
					return <li className={`chat-holder ${message[data].user.email == email ? 'me' : 'you'} `} key={i}>
						<div className="cih">
							<div className="entete">
								<h2>{message[data].user.first_name}</h2>
								<h3>
									{
										getDate(message[data].created_at)
									}
								</h3>
							</div>
							<div className="chatbox">
								<div className="chat-info">
									<div className="message">
									<p class="main-message">{message[data].message}</p>	
										{
											message[data].type != 1 ? null : <a className='dwl' href={message[data].file_path} target='_blank' ><FontAwesomeIcon icon={faDownload} />  </a>
										}
									</div>
								</div>
								<img src={message[data].user.photo || '/images/default.png'} alt="" className="chat-img" />
							</div>
							{message[data].user.email == email ?
								<div className='sending'>
									{
										message[data].sendStatus !== undefined ?
											message[data].sendStatus == 0 ?
												<span>Sending   <FontAwesomeIcon icon={faSpinner} /></span> :
												message[data].sendStatus == 1 ?
													<span className="text-success">sent  <FontAwesomeIcon icon={faCheckDouble} /></span>
													:
													<span className="text-danger">Failed  <FontAwesomeIcon icon={faTimes} /> </span>
											: <span className="text-success">sent  <FontAwesomeIcon icon={faCheckDouble} /></span>
									}

								</div> : null}
						</div>

					</li>
				}
			})
			}

			<div ref={(el) => { bottom = el; }}></div>
			
		</ul>

</>
	)
}


function useChatLoad({ url }) {
	let cancel;
	const [loading, setLoading] = useState(true);
	cont[data, setdata] = useState([])

	useEffect(() => {
		Axios.get(url, {
			cancelToken: Axios.CancelToken(c => cancel = c)
		}).then(resp => {
			setdata(resp.data)
		})

		return () => cancel()
	}, [url])

	return { data }
}

export default class MessageComponent extends React.Component {
	static contextType = Provider;
	constructor(props) {
		super(props)
		this.state = {
			message: [],
			loading: true,
			network: false,
			url: '/api/chat/message',
			next_page_url: '',
			scroll: false,
			shouldScroll: false,
			current: 1,
			online: [],
			switcher: false,
			aside:false
		}
	
	}
	setUrl = () => {
		this.setState({ url: this.state.next_page_url })
	}

	loadChat = () => {

		 
		this.setState({ loading: true })
		Axios.get(this.state.url, {
			params: {
				group: this.props.group
			},
			cancelToken: new Axios.CancelToken(function (c) {
				cancel = c
			}),
			timeout: 1000000
		}).then(async resp => {

			if (resp.data.code == 1) {

				let scroll = this.state.next_page_url == '' ? true : false;

				await this.setState(prev =>
					({
						...prev,
						message: Object.values([...prev.message, ...resp[0].data.message.data]).sort((a, b) => b.id - a.id),
						loading: false,
						next_page_url: resp[0].data.message.next_page_url,
						network: false,
						current: resp[0].data.message.current_page,
						shouldScroll: !scroll
					}))


			}
			else {
				this.setState({ loader: false, network: true })
			}
		}).catch(e => {
			this.setState({ loader: false, network: true })
		})

	}



	async componentDidMount() {

	
		if (this.props.group == 1) {
			channel = 'vol-chat';
		} else if (this.props.group == 2) {
			channel = 'mem-chat';
		} else if (this.props.group == 3) {
			channel = 'spon-chat';
		} else {
			channel = 'adm-chat';
		}
	
		 window.Echo.join(channel)
			.here((user) => {
				let a = user.map(e => e.users_email)
				this.setState({ online: a })
			})
			.joining((user) => {


				this.setState(prev => ({ ...prev, online: [...prev.online, user.users_email] }))
			}).leaving((user) => {

				this.setState(prev => ({ ...prev, online: this.state.online.filter(e => e != user.users_email) }))
			})
			.listen('MemberChat', (e) => {

				let { message } = this.state;
				message.push(e.message);
				let k = Object.values(message).sort((a, b) => b.id - a.id)
				this.setState({ message: k });

			})
			
		this.loadChat()
	}

	setMessage = async (m) => {
		await this.setState({ message: m});
	}


	setScroll = () => {
		this.setState({ scroll: false })
	}

	componentWillUnmount() {
		cancel()
		window.Echo.leave(channel)
	
    
	}

	componentDidUpdate(props, state) {
		if (state.url != this.state.url) {
			this.loadChat()
		}
	}


	render() {
		return (
			<>


			


					<div className="main-container">
					<span className="m-1 friends-btn small-toggle" style={{ cursor: 'pointer' }} onClick={() =>{ this.setState({ aside: !this.state.aside })}}> <FontAwesomeIcon icon={faUserFriends} /> </span>
			
						<main className={`${this.state.aside ? "closemain" : ''}`}>
							<ChatMessage {...this.state} email={this.context.email} setUrl={() => this.setUrl()} setScroll={this.setScroll} setshouldScroll={() => this.setState({ shouldScroll: false })} callback={this.loadChat} />
							<SendMessage message={this.state.message} setMessage={this.setMessage} context={this.context} group={this.props.group} />
						</main>

						<Friends aside={this.state.aside} group={this.props.group} online={this.state.online} />
					</div>


				

			</>)
	}
}








function Friends({ aside, group, online }) {


	function Friendlist({ photo, first_name, last_name, phone_number, email, state_of_residence }) {
		const [open, setopen] = useState(false)
		return (
			<li onClick={() => setopen(!open)} >
				<img src={photo || '/images/default.png'} alt="" className='chat-image' />
				<div>
					<h2>{first_name + ' ' + last_name}</h2>
					<h3>
						<span className={`status ${online.includes(email) ? 'green' : 'orange'}`}></span>{online.includes(email) ? 'online' : 'offline'}
					</h3>
				</div>
				{open ?
					<div className='pl-4 pr-4 font-smaller center' style={{ fontSize: '13px' }}>
						<p> <FontAwesomeIcon icon={faPhoneAlt} /> {phone_number}</p>
						<p> <FontAwesomeIcon icon={faEnvelopeOpen} /> {email}</p>
						<p> <FontAwesomeIcon icon={faMapMarked} /> {state_of_residence}</p>
					</div> : null}
			</li>
		)
	}
	let cancel

	let f = async () => {
		let response = await apiClient.get('/api/chat/friends', {
			params: {
				group: group,
				
			},
			cancelToken: new Axios.CancelToken(c => cancel = c)
		})

		if (response.code == 1) {
			setLoading(false)
			setFriends(response.message)
			setNetwork(false)
		} else {
			setLoading(false)
			setNetwork(true)
		}
	}

	const [loading, setLoading] = useState(true)
	const [friends, setFriends] = useState([])
	const [network, setNetwork] = useState(true)
	const [searchkey, setKey] = useState('')
	useEffect(() => {

		f();
	return	() => cancel()
	}, [group])

	useEffect(()=>{
		return	() => cancel()
	},[])

	let a = friends.filter(e => e.first_name.includes(searchkey) || e.last_name.includes(searchkey))
	return (

		<aside className={`${aside ? "openaside" : ''}`}>
			<header>
				<input type="text" placeholder="search" value={searchkey} onChange={(e) => setKey(e.target.value)} />
			</header>
			{loading ? <span className="w-100 d-flex justify-content-center align-items-center text-white"><FontAwesomeIcon icon={faSpinner} /></span> : network ? <Network action={f} /> :
				<ul>
					{a.map((data, i) => <Friendlist key={i} {...data} />)}

				</ul>
			}
		</aside>
	)


}


