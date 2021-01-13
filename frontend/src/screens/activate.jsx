import React from 'react'
import {ToastContainer, setFormData} from 'react-toastify'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { authenticate, isAuth } from '../helpers/auth.helper'
import { link, Redirect } from 'react-router-dom'

const Activate = () => {
    const[formData, setFormData] = useState({
        name:'',
        token:'',
        show: true
     })
    return (
        <div>

        </div>
    )
}

export default Activate