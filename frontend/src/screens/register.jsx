import React, { useState } from 'react'
//import authSvg from '../assets/auth.svg'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth.helper'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Register = () => {
    return(
        <div>
            Register Page
        </div>
    )
}

export default Register