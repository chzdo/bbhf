import React, { useState, useEffect } from 'react'
import LOGO from '../logo'
import apiClient from '../axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowCircleDown, faPaperclip, faArrowAltCircleLeft, faTimesCircle, faLongArrowAltUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route , Link, useHistory } from 'react-router-dom'

function   MainMenu(props){
    const [show, setShow] = useState(false)
   return ( 
   <div className="menu ">
    <div className="menu-head " onClick={()=>{
        setShow(!show)
    }} >
        <span> {props.menu.title} </span>  <FontAwesomeIcon icon={props.menu.icon} />
        
    </div>
    <div className={`${"sub-menu"} ${show?  "item-show": ""}`}>
           {props.menu.item.map((data,i)=> <Link onClick={()=> props.setopen(false)} key={i} to={data.route} >{data.title}  <FontAwesomeIcon icon={data.icon} /></Link>)}
     
        </div>
</div>
   )
}

export default function Sidebar(props){
const [open,setOpen] = useState(props.open)

  useEffect(()=>{
        setOpen(!open)
  },[props.open])

  let h = useHistory();
 
 
        return (
            <>
                <div className={`${'sider-holder blue'} ${open? 'open':''}`}>
                   <span className="menu-slider text-white w-100 text-right" onClick={()=>setOpen(false)}> <FontAwesomeIcon icon={faTimesCircle} /></span>
                    <LOGO />
                    <div className="title text-white">
                        BLESSED TO BLESS FOUNDATION
                      
                  </div>
                  <i className="text-warning p-1 text-center">"..also see it that you excel in the grace of giving"</i>
                  <hr style={{"borderColor":"white"}}></hr>
                    <div className="menu-holder ">
                     {props.menu.map((data,i)=><MainMenu key={i} menu={data} setopen={setOpen} />)}
                     <a href="/dashboard/logout" className="menu-head logout" > Sign Out <FontAwesomeIcon icon={faSignOutAlt} /></a>
                    </div>
                </div>

            </>


        )
    
}

async function logout(e,h){
e.preventDefault()
h.replace('/dashboard/login');
console.log(h)
 // let response = await apiClient.get('/dashboard/logout')
   // if(response.code == 1){
  //  localStorage.removeItem('auth')
  //  document.location.href = '/dashboard/login/'
   // }

}