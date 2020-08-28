import React from 'react'
import Image from '../main-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'

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

export function Head(props) {
    return (<>
        <div className="page-head">
            <div className="breadcrumb">
                {props.crumb.map((data,i)=> <a key={i} className="breadcrumb-item" href={data.route}>{data.title}</a>
  
                        )}
               </div>

            <div className="page-info">
                {props.sidemenu || null}
            </div>
        </div>

    </>)
}