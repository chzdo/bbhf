import React, { useState, useEffect } from 'react';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import Loader from './loader'

export default function Paystack(props){     

const config = {
    reference: (new Date()).getTime(),
    email: props.email,
    amount: props.amount,
    publicKey: 'pk_test_a20e878518fa72e765226f0b2cebcece08d2cedb',
    firstname: props.firstname,
    lastname: props.lastname
};

const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    
};


const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
   setLoader(false)
}
const [loader, setLoader ] = useState(props.loader)
const [disabled, setDisabled ] = useState(props.disabled)
        useEffect(()=>{
            if(props.loader != loader){
                setLoader(props.loader)
            }
            if(props.disabled != disabled){
                setDisabled(props.disabled)
            }
        },[props.loader, props.disabled])
const PaystackBtn = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        
            <button className="bbhf_btn bbhf_btn_green" onClick={(e) => {
                setLoader(true)
                setDisabled(true)
                e.preventDefault()
                initializePayment(props.onSuccess,  onClose)
            }}
            disabled = {disabled}
            >
                
                
                {
                
                (loader)? <Loader />:
                props.text}</button>
        
    );
};
   return  <PaystackBtn />
}