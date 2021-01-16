import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth.helper'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Dashboard = () => {
    axios.post(`http://localhost:5000/api/dashboard`).then(res => {
        console.log(res)
    } )
    return(
        <div></div>
    )
}


export default Dashboard