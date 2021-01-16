
import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth.helper';
import { JsonWebTokenError } from 'jsonwebtoken';



const Profile = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        skills: []
      });
    
      useEffect(() => {
        loadProfile();
      }, []);

      const loadProfile = () => {
        const token = getCookie('token');
        const url = "http://localhost:5000/api/user"
        const data = {_id: `${jwt.decode(token)._id}`}
        const headers = {
        "Content-Type": "application/json"
    }
    axios.post(url, data, headers)
          .then((res) => {
            const { role, name, email } = res.data;
            setFormData({ ...formData, role, name, email });
          })
        }
    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                Profile
              </h1>
  
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
              >
                <div className='mx-auto max-w-xs relative '>
                  <input
                    disabled
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    type='text'
                    placeholder={formData.name}
                  />
                  <input
                    disabled
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='email'
                    placeholder={formData.email}
                    
                  />
                  <input
                    disabled
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder={formData.role}
                  />
                </div>
                <div className='my-12 border-b text-center'>
                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                    Go To Home
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
             bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/dashboard'
                    target='_self'
                  >
                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-4'>Dashboard</span>
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

export default Profile
