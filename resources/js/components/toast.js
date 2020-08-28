import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export default class Toast extends React.Component{

componentDidUpdate(prevprops,prevstate){

  if(prevstate.show != this.props.show){
      this.setState({show: this.props.show})
  }
}
    constructor(props){
               super(props)
              
               this.state = {
                   show:this.props.show
               }
    }
close = async () =>{
  await  this.setState({show:'hide'})
  
  setTimeout( async () => {
      await   this.setState({show:'hide'})
     await    this.props.cleanToast();
    }, 1000); 
}



async componentDidMount(){
  await  this.setState({show:this.props.show})
 
}

render(){
    return <>
 
    <div id="toast" className={`
       ${this.props.color}
        ${this.state.show}
       
        `

    }>
        <div className="toast-head">
            <span id="">    {this.props.title} </span>

            <span id="toast-close"  onClick={this.close}><FontAwesomeIcon icon={faTimesCircle}/></span>
        </div>
        <div className="toastBody">

            {this.props.message.split("\n").map(((data, i) => <div key={i} >{data}</div>))}

                         
        </div>
    </div>

</>
}
}

 function Toast2(props) {
 
    const  [show, setShow] =  useState('');
     function close() {
        setShow('hide')
     
        setTimeout(() => {
            setShow('')
            props.cleanToast();
        }, 1000); 
    }
   
  if(show == '' && props.show != ''){
      setShow('show')
  }
   //  props.show ? setShow("show") : '';
  
}