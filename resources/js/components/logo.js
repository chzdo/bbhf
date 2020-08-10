import React from 'react';
import image from '../main-logo.png'


export default function LOGO(props){
 
  return  <>
     <img src={props.path+'/main-logo.png'} style={{width:'100px', height:"100px"}} className="logo-rotate" id="logo-rotate" />
    </>
}