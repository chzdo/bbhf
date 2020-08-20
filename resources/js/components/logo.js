import React from 'react';
import image from '../main-logo.png'


export default function LOGO(props){
 
  return  <>
     <img src={props.path+'/main-logo.png'} style={{width:'80px', height:"80px"}} className="logo-rotate" id="logo-rotate" />
    </>
}