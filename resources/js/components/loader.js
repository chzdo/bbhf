import React from 'react'
import Image from '../main-logo.png'

export default function Loader (props){

    return (
    <>
    <img src={Image}  className=" loader" id="logo-rotate" />
    </>
    )
}