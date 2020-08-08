import React from 'react';
import image from '../main-logo.png'


export default function LOGO(props){
 
  return  <>
     <img src={props.path+'/main-logo.png'}  className="logo-rotate" id="logo-rotate" />
    </>
}