import React from  'react';
import ReactDom from 'react-dom'
import LOGO from './logo'
import InputText from './input'
import {SelectInput} from './input'
import Paystack from './paystack'

import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { post } from 'jquery';
import Axios from 'axios';
import apiClient from './axios'
import Toast from './toast'
class Donate extends React.Component{
 async componentDidMount(){

   let  {project,category} = this.props;
   this.state.category_loader = true;
   console.log(project)
   let uri =  '/api/category'
 let req_resp = await  apiClient.get(uri)
 let {code,message} = req_resp
 if (code == 1){
        let cat_id = (category == null)? {value:"", state:false}: {value:category, state:true};
        let proj_id = (project == null)? {value:"", state:false}: {value:project, state:true};
        await this.getProjects(cat_id.value) 
       await   this.setState(prev=>({...prev,category: message,category_loader:false,config:{...prev.config,category:cat_id,project:proj_id}}))
      
    }else{
    await  this.setState({category_loader:false})
    }


}

async componentDidUpdate(prevprops,prevstate){
let {category} = this.state.config;
    if(prevstate.config.category.value !=  category.value){
        this.getProjects(category.value)
    }

   if (prevstate.loader && this.state.loader){
    this.setState({loader: !this.state.loader})
}
  
}
    constructor(props){
        super(props);
 
        this.state = {
          validate:false,
          invalid:false,
          toast:{
            show:false,
            color:'',
            title:'',
            message:'',
        
        },
            config : {
               
                email:{
                    value:'',
                    state:false
                },
                amount:{
                    value:0,
                    state:false
                },
               
                  fullname:{
                    firstname: {
                        value:'',
                        state:false
                    },
                    lastname: {
                        value:'',
                        state:false
                    }
                  },
                name:{
                    value:'',
                    state:false
                },
                phone:{
                    value:'',
                    state:false
                },
         
                category:{
                    value:'',
                    state:false
                },
                project:{
                    value:'',
                    state:false
                },
               
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
        this.setState(prev=>({...prev,toast:{
           show: false,
           color:'',         
           title:'',
           message:''
        }}))
     }
 
defaultvalue ={
     
               
        email:{
            value:'',
            state:false
        },
        amount:{
            value:0,
            state:false
        },
       
          fullname:{
            firstname: {
                value:'',
                state:false
            },
            lastname: {
                value:'',
                state:false
            }
          },
        name:{
            value:'',
            state:false
        },
        phone:{
            value:'',
            state:false
        },
 
        category:{
            value:'',
            state:false
        },
        project:{
            value:'',
            state:false
        },
       
    
     
}

regState = () => {
    let state = Object.keys(this.state.config).some(key => {
        return this.state.config[key].state == false

    }
    )
    return state

}

    getValues = async(event,state)=>{
     
        const id = event.target.id
        const val = {
            value: event.target.value,
            state: state
        }    
         
    await this.setState(prevState=>({...prevState,config:{...prevState.config,[id]:val}}));
 console.log(this.state.config)
      if(this.regState() == false){
        await this.setState(prevState=>({
            ...prevState,config:{
                   ...prevState.config,
                
                  fullname:{firstname:{
                      value: this.state.config.name.value.split(" ")[0],
                    state:true,
                  },
                  lastname:{
                    value: this.state.config.name.value.split(" ")[1],
                    state:true, 
                  } 
                }
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
        .then(async resp=>
            {
       
               if (resp.data.message.data.status == "success"){
                   let cred = {
                    "name":this.state.config.name.value,
                   "email":this.state.config.email.value,
                   "donation_reference":resp.data.message.data.reference,
                     "donation_category":this.state.config.category.value,
                     "donation_project":this.state.config.project.value,
                     "donation_amount":this.state.config.amount.value
                  }
                  let donate = await apiClient.sendPost('/api/donation/create',cred)
                  console.log(donate)
                  let {message, code } = donate;                   

                        let toastConfig = {
                            show : true,
                            color: 'toastGreen',
                             title: 'Success',
                             message :message
                              }


                            if(code == 1){
                               toastConfig.color = 'toastGreen'
                               toastConfig.title = 'Success'
     
                                    await this.setState({config:this.defaultvalue,toast:toastConfig,loader:false,invalid:false})
                                 }else{
                                   toastConfig.color = 'toastRed'
                                      toastConfig.title = 'Failure'
  
                                 await this.setState({toast:toastConfig,loader:false})
                               }
                                                   
                   
            
          
               }else{
                let toastConfig = {
                    show : true,
                color:'toastRed',
                    title :'Failure',
                     message :"transaction was not successful"
                      }
             await   this.setState({loader:false,toast:toastConfig});
               }
            }
        ).catch(async err=>{
            let toastConfig = {
                show : true,
            color:'toastRed',
                title : 'Failure',
                 message :"transaction was not successful"
                  }
         await   this.setState({loader:false,toast:toastConfig});
    
        })

 
 
   
    }






getProjects= async  (id='')=>{

this.setState(prevState=>({...prevState,config:{...prevState.config,project:''}, project_loader:true,project:[]}));
let project_request = await apiClient.get('/api/category/'+id+'/project')
if (project_request.code == 1)
{
  await  this.setState({project: project_request.message,project_loader: false})
}
else
{
   await this.setState(prev=>({...prev,project_loader:false}))
}
   
}
    render(){

   
        return (
            <>
     
          
          
        
            <div className="donate-container row"> 
            <Toast

show={this.state.toast.show ? "show" : ''}
color={this.state.toast.color}
title={this.state.toast.title}
message={this.state.toast.message}
cleanToast={this.cleanToast}
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
                            value = {this.state.config.name.value}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,name:true}}
                            reset = {this.state.reset}
                            />
                             <InputText 
                            type="number"
                            id="phone"
                            label="Phone Number"
                            value = {this.state.config.phone.value}
                            getValues = {this.getValues}
                            constraint={{required:true,max:11,min:11}}
                            reset = {this.state.reset}
                            />
                             <InputText 
                            type="email"
                            id="email"
                            label="Email"
                            value = {this.state.config.email.value}
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
                                  value ={this.state.config.category.value}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                                 <SelectInput
                                 id="project"
                                 isLoading = {this.state.project_loader}
                                  data = {this.state.project}
                                  label ="Project"
                                   valueKeys = {{"value":"id","label":"project"}}
                                  value ={this.state.config.project.value}
                                  getValues = {this.getValues}
                                  reset = {this.state.reset}
                               />
                                  <InputText 
                            type="number"
                            id="amount"
                            label="Amount"
                            value = {this.state.config.amount.value}
                            step = "0.0001"
                            getValues = {this.getValues}
                            reset = {this.state.reset}
                            constraint={{required:true,number:true,min:0}}
                        
                            />
                         
                            <Paystack 
                             email = {this.state.config.email.value} 
                             phone = {this.state.config.phone.value} 
                             amount = {parseFloat(this.state.config.amount.value) * 100} 
                             firstname = {this.state.config.fullname.firstname.value} 
                             lastname =  {this.state.config.fullname.lastname.value} 
                             text = "Donate"
                             loader = {this.state.loader}                            
                             disabled = {this.regState() || this.state.invalid}
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