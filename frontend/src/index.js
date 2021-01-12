import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from './screens/register'

ReactDOM.render(
  <BrowserRouter>
    <switch>
      <Route path='/' exact render={props => <App {...props}/>}/>
      <Route path='/register/' exact render={props => <Register {...props}/>}/>
    </switch>
  </BrowserRouter>,
  document.getElementById('root')
);

