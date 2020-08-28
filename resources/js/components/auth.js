import {Switch , HashRouter as Router} from 'react-router-dom'
import Join from './join'




function Auth(){
  
 
        <Switch>
            <Route path="/dashboard/login" component={Join}  />
            <Route path="/dashabout" component={dashIndex} />
      
        </Switch>
    
 
}