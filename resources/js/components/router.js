import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import Donate from './donate'
import Reset from './reset'
import Register from './register'
import { SelectInput } from './input'
import Toast from './toast'
import Activity from './reactact'
import apiClient from './axios'
import Loader from './loader'
import { HashRouter as Router, Route ,Switch, Link} from 'react-router-dom';
import Paystack from './paystack'

function App() {
    return (
        <Router>
        <main>
            <Switch>
                <Route path="/dashboard/admin/donate" component={Donate} exact />
                <Route path="/dashabout" component={Reset} />
                <Route path="/shop" component={Register} />
                <Route path="*" component={Paystack} />
            </Switch>
        </main>
        <div>
        <Link to="/dashboard/admin/donate">Home </Link>
        <Link to="/about">About Us </Link>
        <Link to="/shop">Shop Now </Link>
      </div>
        </Router>
       
    )
}

if (document.getElementById('router')) {

    ReactDom.render(<App  />, document.getElementById('router'));
}