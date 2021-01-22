import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth, getCookie } from '../helpers/auth.helper'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {Redirect} from 'react-router-dom'
import { useHistory, useLocation } from "react-router-dom";

const ApplyJob = () => {

    const location = useLocation()
    const history = useHistory()
    let [formData, setFormData] = useState({
        applicantId: '',
        jobId: '',
        bio: '',
        skills: []
    })
    let {applicantId, jobId, bio, skills} = formData
    const token = getCookie('token')
    applicantId = jwt.decode(token)._id
    jobId = location.state.params
    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
        console.log(formData)
    }


    const handleSubmit = e => {
        e.preventDefault()
        if(bio && skills) {
                axios.post(`http://localhost:5000/api/add-application`, {
                    applicantId, jobId, bio, skills
                }).then(res => {
                    setFormData({
                        ...formData,
                        applicantId,
                        jobId,
                        bio,
                        skills
                    })
                    toast.success("Applied Successfully")
                }).catch(err=>{
                    toast.error(err.response.data.error)
                })
        } else {
            toast.error('Please fill all the fields')
        }
    }

    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                Sign Up for JobWala
              </h1>
  
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}
              >
                <div className='mx-auto max-w-xs relative '>
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='bio'
                    onChange={handleChange('bio')}
                    value={bio}
                  />
                
                  <button
                    type='submit'
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        ;
      </div>
    )
}

export default ApplyJob