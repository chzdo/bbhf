import React from  'react';
import ReactDom from 'react-dom'
import LOGO from './logo'
import InputText from './input'
import {SelectInput} from './input'
import Paystack from './paystack'

import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { post } from 'jquery';
import Axios from 'axios';
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
        this.setState(prev=>({...prev,category: response.message,category_loader:false,donor:{...prev.donor,category:category,project:project}}))
        }else{
            this.setState(prev=>({...prev,category_loader:false}))
     
        }
       
        console.log(response)
    }
    ).catch(error=>console.log(error))
//await this.setState({loading: !this.state.loading})

}

async componentDidUpdate(prevprops,prevstate){
    const {fullname,email,phone,amount,category,project } = this.state.donor
    if(prevstate.donor.category !=  category){
        this.getProjects(category)
    }
 

  
}
    constructor(props){
        super(props);
   
        this.state = {
          validate:false,
            config : {
               
                email: "",
                amount: 0,
               
                firstname: '',
                lastname: ''
            },
            donor:{
                fullname:'',
                phone:'',
                email:'',
                category:'',
                project:'',
                amount:''
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

  
   sucessCallBack= (reference) =>{
       console.log("2",reference)
   }
  



    getValues = async(event,state)=>{
        const name = event.target.id
        const value=  state? event.target.value : ''
         console.log(name,event.target.value );
         
    await this.setState(prevState=>({...prevState,donor:{...prevState.donor,[name]:value}, valid:false}));
    const {fullname,email,phone,amount,category,project } = this.state.donor
    if(fullname != '' && phone != '' &&  email != '' && category != '' && project != '' && amount != ''){
      
        await this.setState(prevState=>({
            ...prevState,valid:true,config:{
                   ...prevState.config,
                  email : this.state.donor.email,
                  phone : this.state.donor.phone,
                  amount : parseFloat(this.state.donor.amount) * 100,
                  firstname: this.state.donor.fullname.split(" ")[0],
                  lastname: this.state.donor.fullname.split(" ")[1],
        }
    }
    )
    )
    }


    }

    Success = (response)=>{
        console.log(response)
     
        let {redirecturl } = response; //for production
        axios.get(redirecturl)
        .then(resp=>console.log(resp));

 
 
   
    }
close = ()=>{

}




getProjects=(id='')=>{
    console.log(id)
this.setState(prevState=>({...prevState,donor:{...prevState.donor,project:''}, project_loader:true,project:[]}));
    fetch('/api/category/'+id+'/project',{
        method:"get",
       
        }).then(response=>response.json()).then(response=>{
       if(response.code == 1){
       this.setState({project: response.message,project_loader: false})
       console.log(response.message);
          }else{
        this.setState(prev=>({...prev,project_loader:false}))
 
    }
      
    console.log(response)}
   ).catch(error=>console.log(error))
}
    render(){
        
   
   
        return (
            <>
     
            <div className="donate-background">  </div>
            <div className="donate-container row"> 
               <div className="form-container col-md-4 mx-auto">
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
                            id="fullname"
                            label="Name"
                            value = {this.state.donor.fullname}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,fullname:true}}
                            />
                             <InputText 
                            type="number"
                            id="phone"
                            label="Phone Number"
                            value = {this.state.donor.phone}
                            getValues = {this.getValues}
                            constraint={{required:true,max:11,min:11}}
                            />
                             <InputText 
                            type="email"
                            id="email"
                            label="Email"
                            value = {this.state.donor.email}
                            helper="Enter your Full Name"
                            getValues = {this.getValues}
                            constraint={{required:true,email:true}}
                            />
                            <SelectInput
                                 id="category"
                                 isLoading = {this.state.category_loader}
                                  data = {this.state.category}
                                  label ="Category"
                                  valueKeys = {{"value":"id","label":"category"}}
                                  value ={this.state.donor.category}
                                  getValues = {this.getValues}
                               />
                                 <SelectInput
                                 id="project"
                                 isLoading = {this.state.project_loader}
                                  data = {this.state.project}
                                  label ="Project"
                                   valueKeys = {{"value":"id","label":"project"}}
                                  value ={this.state.donor.project}
                                  getValues = {this.getValues}
                               />
                                  <InputText 
                            type="number"
                            id="amount"
                            label="Amount"
                            value = {this.state.donor.amount}
                            step = "0.0001"
                            getValues = {this.getValues}
                            
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