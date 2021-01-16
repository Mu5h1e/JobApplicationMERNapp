import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from './screens/register'
import Activate from './screens/activate'
import Login from './screens/login'
import ForgotPassword from './screens/forgotPassword.jsx';
import ResetPassword from './screens/resetPassword.jsx';
import Profile from './components/profile'
import 'react-toastify/dist/ReactToastify.css'
import AddJobListing from './components/addJobListing';
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props}/>}/>
      <Route path='/register/' exact render={props => <Register {...props}/>}/>
      <Route path='/login/' exact render={props => <Login {...props}/>}/>
      <Route path='/users/activate/:token' exact render={props => <Activate {...props}/>}/>
      <Route path='/users/password/forget' exact render={props => <ForgotPassword {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgotPassword {...props} />} />
      <Route path='/users/profile' exact render={props => <Profile {...props} />} />
      <Route path='/jobs/addlisting' exact render={props => <AddJobListing {...props} />} />
      {/* <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

