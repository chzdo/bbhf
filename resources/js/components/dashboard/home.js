import React, { useState, useContext, useEffect } from 'react'

import Axios from 'axios'
import Provider from './usercontext'
export function Home(props) {
    function Lazy(){
        return(
            <>
                   <div class="col-md-4 bg-gray m-1" style={{height:'300px',background:'#ccc'}} >
                         
                            
                        </div>
                        <div class="col-md-4 bg-gray m-1" style={{height:'300px',background:'#ccc'}}>
                         
                            
                        </div>
                        <div class="col-md-4 bg-gray m-1" style={{height:'300px',background:'#ccc'}}>
                         
                            
                        </div>
                
            </>
        )
    }
     
        const [project, setProject] = useState([])
        const [grant, setGrant] = useState([])
        const [loading, setLoading] = useState(true)
        const user = useContext(Provider)
    const colors = [
        'linear-gradient(315deg, #a40606 0%, #d98324 74%)',
        'linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)',
    
    'linear-gradient(315deg, #42378f 0%, #f53844 74%)'
    ]
    let cancel
    useEffect(()=>{
console.log(project.length)
    
        Axios.get('/api/projects/active',{
            cancelToken: new Axios.CancelToken(e=>cancel = e)
        }).then(resp=>{
          
            if (resp.data.code==1){
                setProject(resp.data.message)
           
            }
            setLoading(false)
        }).catch(err=>{
            if(err.isCancel()){
                return;
            }
        })
       
        return ()=>cancel()
    },[user])
    
    
    
        return (
            <>
    
                <div className="home-container bg-white h-100">
    
                    <div className="card-row">
                        {loading? <Lazy /> : project.length == 0? 'No Projects Yet ' :
                        project.map((data,i)=>{
                            let raised = data.amount_raised == null ? 0 : data.amount_raised;
                            let per = ((parseFloat(raised)/parseFloat(data.amount)) * parseFloat(100)).toFixed(2)  ;
                            console.log(per)
                    return (
                        <div class="col-md-4" key={i}>
                            <div className="home-card" style={{backgroundImage:`${colors[i]}`}}>
                                <p class="project-description-header">
                                         {data.project}
                                </p>
                                <p class="project-description-article">
                              {data.description}
                             
                                        </p>
                                <div className="raised-amount">
                                    <div className="progress-cont">
                                        <div className="progress-flo" style={{ width: `${per>100? '100' : per}%` }}>
                                        </div>
                                    </div>
                                    <div className="raised">
                                        <p> Goal - N{parseFloat(data.amount).toLocaleString()} </p> <p> {per}% </p> <p> Raised - N{parseFloat(raised).toLocaleString()}</p>
                                    </div>
                                </div>
                                <a href={`/donate/${data.category}/${data.id}`} class="donate-btn"> Donate </a>
                            </div>
                        </div>
                    )
                        })}
                        
                    </div>
                </div>
    
    
            </>
        )
    }