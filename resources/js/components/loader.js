import { faArrowLeft, faNetworkWired } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import React from 'react'

export default function Loader (props){

    return (
    <>
    <img src="/images/main-logo.png"  className=" loader" id="logo-rotate" />
    </>
    )
}



export function Network(props){
   return(
    <div className="d-flex flex-column m-5 "> 
    <h3> Oops Something went wrong..  <FontAwesomeIcon icon={faNetworkWired} /></h3>
    <h6 style={{color:'#444'}}>Check your network</h6> 
     <button onClick={props.action} className="bbhf_btn bbhf_btn_orange">
        Try Again?
        </button>
        </div>
    )
}


export function NotFound(props){
   return(
    <div className="d-flex flex-column m-5 "> 
    <h3> Oops What you are looking for is not here..  <FontAwesomeIcon icon={faNetworkWired} /></h3>
    <h6 style={{color:'#444'}}>Go Back</h6> 
     <button onClick={props.action} className="bbhf_btn bbhf_btn_orange">
         <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        </div>
    )
}
export function Head(props) {
    return (<>
        <div className="page-head">
            <div className="breadcrumb">
                {props.crumb.map((data,i)=> <Link key={i} className="breadcrumb-item" to={data.route}>{data.title}</Link>
  
                        )}
               </div>

            <div className="page-info">
                {props.sidemenu || null}
            </div>
        </div>

    </>)
}