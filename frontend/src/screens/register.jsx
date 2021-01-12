import React, { useState } from 'react'
//import authSvg from '../assets/auth.svg'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth.helper'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    })
    const {name, email, password1, password2} = formData

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(name && email && password1) {
            if(password1 === password2) {
                axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    name,email,password:password1
                }).then(res => {
                    setFormData({
                        ...formData,
                        name:'',
                        email:'',
                        password1:'',
                        password2:''
                    })
                    toast.success(res.data.message)
                }).catch(err=>{
                    toast.error(err.response.data.error)
                })
            } else {
                toast.error('Passwords do not match')
            }
        } else {
            toast.error('Please fill all the fields')
        }
    }

    return(
        <div className='min-h-screen bg-grat-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/'/> : null}
        </div>
    )
}

export default Register