import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { updateUser, getCookie, signout } from '../helpers/auth.helper';
import {Redirect} from 'react-router-dom'

const AddJobListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        email: '',
        maxApplications: null,
        maxOpenings: null,
        description: '',
        skills: []
    })
    const {title, email, maxApplications, maxOpenings, description, skills} = formData
    const token = getCookie('token');
    const url = "http://localhost:5000/api/user"
    const data = {_id: `${jwt.decode(token)._id}`}
    const headers = {
    "Content-Type": "application/json"
    }
    axios.post(url, data, headers)
      .then((res) => {
        const { role, name, email } = res.data;
        formData.email = email
      })
    console.log(formData.email)
    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value})
    }


    const handleSubmit = e => {
        e.preventDefault()
        if(title && maxApplications && maxOpenings && description && skills) {
          axios.post(`http://localhost:5000/api/addJobListings`, {
              title,email,maxApplications, maxOpenings, description, skills
          }).then(res => {
              setFormData({
                  ...formData,
                  title: '',
                  email: '',
                  maxApplications: null,
                  maxOpenings: null,
                  description: '',
                  skills: []
              })
              toast.success(res.data.message)
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
                add job :D
              </h1>
  
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}
              >
                <div className='mx-auto max-w-xs relative '>
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='title'
                    onChange={handleChange('title')}
                    value={title}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='email'
                    value={email}
                    disabled
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='number'
                    placeholder='max no of openings'
                    onChange={handleChange('maxApplications')}
                    value={maxApplications}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='number'
                    placeholder='max no of openings'
                    onChange={handleChange('maxOpenings')}
                    value={maxOpenings}
                  />
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='description'
                    onChange={handleChange('description')}
                    value={description}
                  />
                
                  <button
                    type='submit'
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  </button>
                </div>
                <div className='my-12 border-b text-center'>
                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                    Or sign with email
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
             bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/login'
                    target='_self'
                  >
                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-4'>Add job</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        ;
      </div>
    )
}

export default AddJobListing