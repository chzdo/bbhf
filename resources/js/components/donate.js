import React from  'react';
import ReactDom from 'react-dom'
import LOGO from './logo'
import InputText from './input'
import {SelectInput} from './input'
import Paystack from './paystack'

import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { post } from 'jquery';
import Axios from 'axios';
import Toast from './toast'
class Donate extends React.Component{
 async componentDidMount(){

   let  {project} = this.props;
   this.state.category_loader = true;
let uri = this.props.project != null? '/api/category/'+project : '/api/category'
    fetch(uri,{
         method:"get",
          headers:{
             'Accept': 'application/json'
         }
    }).then(response=>response.json()).then(response=>{
        if(response.code==1){
     let category =   this.props.category != null? this.props.category:""
     let project = this.props.project != null? this.props.project: '';
        this.setState(prev=>({...prev,category: response.message,category_loader:false,config:{...prev.config,category:category,project:project}}))
        }else{
            this.setState(prev=>({...prev,category_loader:false}))
     
        }
       
       
    }
    ).catch(error=>console.log(error))
//await this.setState({loading: !this.state.loading})

}

async componentDidUpdate(prevprops,prevstate){
    const {name,email,phone,amount,category,project } = this.state.config
    if(prevstate.config.category !=  category){
        this.getProjects(category)
    }
   if (prevstate.reset && this.state.reset){
       this.setState({reset: !this.state.reset})
   }
   if (prevstate.loader && this.state.loader){
    this.setState({loader: !this.state.loader})
}
  
}
    constructor(props){
        super(props);
   
        this.state = {
          validate:false,
          toastRed:false,
          toast:false,
          toastGreen:false,
          toastMessage:"",
          toasttitle:'',
            config : {
               
                email: "",
                amount: 0,
               
                firstname: '',
                lastname: '',
                name:'',
                phone:'',
         
                category:'',
                project:'',
               
            },
                      category:[
             
            ],
              project:[],
              project_loader:false,
              category_loader:false,
            valid:false,
           check:false,
           loading:true

        }
      
    }

  cleanToast = () =>{
      
     
     this.setState({
        toastRed: false,
        toastGreen:false,
        toast:false,
        toasttitle:'',
        toastMessage:''
     })
  }
 


    getValues = async(event,state)=>{
        const id = event.target.id
        const value=  state? event.target.value : ''
     
         
    await this.setState(prevState=>({...prevState,config:{...prevState.config,[id]:value}, valid:false}));
    const {name,email,phone,amount,category,project } = this.state.config
    if(name != '' && phone != '' &&  email != '' && category != '' && project != '' && amount != ''){
      
        await this.setState(prevState=>({
            ...prevState,valid:true,config:{
                   ...prevState.config,
                  amount : parseFloat(this.state.config.amount) * 100,
                  firstname: this.state.config.name.split(" ")[0],
                  lastname: this.state.config.name.split(" ")[1],
        }
    }
    )
    )
    }


    }

    Success = async (response)=>{

        let {trxref} = response;
        let {redirecturl } = response; //for production
        axios.get(redirecturl)
        .then(resp=>
            {
        
               if (resp.data.message.data.status == "success"){
                 
                  fetch('/api/donation/create',{
                      method:'post',
                      body:JSON.stringify({
                        "name":this.state.config.name,
                        "email":this.state.config.email,
                       "donation_reference":resp.data.message.data.reference,
                         "donation_category":this.state.config.category,
                         "donation_project":this.state.config.project,
                         "donation_amount":this.state.config.amount
                      }),

                      headers:{
                          "Accept":'application/json',
                          "Content-Type":'application/json'
                      }
                  }).then(resp=>resp.json()).then(async (resp)=>{
                 
                   if(resp.code == 1){
                            
                       this.setState({valid:false,loader:false,reset:true,toast:true,toastGreen:true,toastMessage:resp.message,toasttitle:'Succesfull!',
                       config : {
                          email: "",
                        amount: 0,                     
                        firstname: '',
                        lastname: '',
                        name:'',
                        phone:'',                 
                        category:'',
                        project:'',
                       
                    }
                    
                    });
                           
                       }else{
                         let {message } = resp;
                    
                        // let error = JSON.parse(message)
                        let err = '';
                         for(var error in message){
                         
                           
                                 err +=   message[error][0] + "\n"
                           
                         }
                       
                           
                        this.setState({valid:false,loader:false,toast:true,toastRed:true,toastMessage:err,toasttitle:'Failure'});
                       }
            
                   }
               ).catch(error=>console.log(error));
          
               }else{
                this.setState({valid:false,loader:false,toast:true,toastRed:true,toastMessage:"Transaction was not successful",toasttitle:'Failure'});
               }
            }
        ).catch(err=>{
            this.setState({valid:false,loader:false,toast:true,toastRed:true,toastMessage:err.message,toasttitle:'Failure'});
        })

 
 
   
    }






getProjects=(id='')=>{
   
this.setState(prevState=>({...prevState,config:{...prevState.config,project:''}, project_loader:true,project:[]}));
    fetch('/api/category/'+id+'/project',{
        method:"get",
       
        }).then(response=>response.json()).then(response=>{
       if(response.code == 1){
       this.setState({project: response.message,project_loader: false})
  
          }else{
        this.setState(prev=>({...prev,project_loader:false}))
 
    }
      
 }
   ).catch(error=>console.log(error))
}
    render(){

   
        return (
            <>
     
          
          
        
            <div className="donate-container row"> 
            <Toast

show = {this.state.toast? "show":''}
color = {this.state.toastGreen? "toastGreen" : "toastRed"}
title = {this.state.toasttitle}
message = {this.state.toastMessage}
cleanToast = {this.cleanToast}
/>
               <div className="form-container col-md-7 col-lg-4 col-xl-4  col-sm-7 mx-auto">
               <LOGO  path={this.props.path} />
                  
                  <div className="f-name">
                      BLESS TO BLESSED FOUNDATION
                  </div>
                  <div className="input-container">
                  <div className="g-tks">
                      Thank you for giving  
                          
                      <i className="fa fa-gift text-warning "></i>
                  </div>
                  <hr></hr>
                  <form className="form" >
                          <InputText 
                            type="text"
                            id="name"
                            label="Name"
                            value = {this.state.config.name}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,name:true}}
                            reset = {this.state.reset}
                            />
                             <InputText 
                            type="number"
                            id="phone"
                            label="Phone Number"
                            value = {this.state.config.phone}
                            getValues = {this.getValues}
                            constraint={{required:true,max:11,min:11}}
                            reset = {this.state.reset}
                            />
                             <InputText 
                            type="email"
                            id="email"
                            label="Email"
                            value = {this.state.config.email}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,email:true}}
                            reset = {this.state.reset}
                            />
                            <SelectInput
                                 id="category"
                                 isLoading = {this.state.category_loader}
                                  data = {this.state.category}
                                  label ="Category"
                                  valueKeys = {{"value":"id","label":"category"}}
                                  value ={this.state.config.category}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                                 <SelectInput
                                 id="project"
                                 isLoading = {this.state.project_loader}
                                  data = {this.state.project}
                                  label ="Project"
                                   valueKeys = {{"value":"id","label":"project"}}
                                  value ={this.state.config.project}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                                  <InputText 
                            type="number"
                            id="amount"
                            label="Amount"
                            value = {this.state.config.amount}
                            step = "0.0001"
                            getValues = {this.getValues}
                            reset = {this.state.reset}
                            constraint={{required:true,number:true,min:0}}
                        
                            />
                            {
                              !this.state.valid? this.state.disabled = true:this.state.disabled = false
                            } 
                            <Paystack 
                             email = {this.state.config.email} 
                             phone = {this.state.config.phone} 
                             amount = {this.state.config.amount} 
                             firstname = {this.state.config.firstname} 
                             lastname =  {this.state.config.lastname} 
                             text = "Donate"
                             loader = {this.state.loader}
                            
                             disabled = {!this.state.valid}
                             onSuccess = {this.Success}
                             onClose = {this.close}
                             />
                   
                  </form>
                  </div>
                    
                  
                  
            
                   </div>
                  
               </div>
                          
               
            </>
        )
    }

   
}


export default Donate;

if(document.getElementById('donateBG')){
    let path = document.getElementById('donateBG').getAttribute('path');
    let category = document.getElementById('donateBG').getAttribute('category')
    let project = document.getElementById('donateBG').getAttribute('project')
    ReactDom.render(<Donate path={path} category={category} project={project} />,document.getElementById('donateBG'));
}