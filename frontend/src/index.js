import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from './screens/register'
import Activate from './screens/activate'
import Login from './screens/login'
import ForgotPassword from './screens/forgotPassword.jsx';
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props}/>}/>
      <Route path='/register/' exact render={props => <Register {...props}/>}/>
      <Route path='/login/' exact render={props => <Login {...props}/>}/>
      <Route path='/users/activate/:token' exact render={props => <Activate {...props}/>}/>
      <Route path='/users/password/forget' exact render={props => <ForgotPassword {...props} />} />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

