import React, { useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth , getCookie} from '../helpers/auth.helper'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import {Redirect} from 'react-router-dom'
import { useHistory, useLocation } from "react-router-dom";


const ExpandedDashboard = () => {
    const history = useHistory();


    const location = useLocation()

    let [currentJobListing, setCurrentJobListing] = React.useState({
        title: '',
        email: '',
        maxApplications: null,
        maxOpenings: null,
        description: '',
        skills: []
    })

    let [currentEmail, setCurrentEmail] = React.useState('')
    let [currentRole, setCurrentRole] = React.useState(0)
    useEffect(() => {
        loadData()
        loadProfile()
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
                console.log(res.data.role)
                if(res.data.role == 'employee') {
                    let role=1
                    setCurrentRole(1)
                    console.log(currentRole)
                }
                setCurrentEmail(res.data.email)
            })
        }
        const handleSubmitApply = () => {
            history.push('/add-application',{params:location.state.params})
        }
        const handleSubmitCheckApplications = () => {
            history.push('/show-applications',{params:location.state})
        }
      const loadData = () => {
        const data = {id: `${location.state.params}`}
        const headers = {
        "Content-Type": "application/json"
    }
        const url = "http://localhost:5000/api/expanded-dashboard"
        axios.post(url, data, headers)
        .then(res => {
            setCurrentJobListing(res.data)
            })
    }  

    return(
<div class="grid mx-20">
    <div class="bg-white rounded-lg shadow-sm hover:shadow-lg duration-500 px-2 sm:px-6 md:px-2 py-4 my-6">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-0 sm:col-span-2 text-center hidden sm:block">

                <p class="grid grid-rows-2 mx-auto mb-3 py-1 w-4/5 2lg:w-3/5 rounded-md bg-green-400">
                    <div class="inline-block font-medium text-2xl text-white">
                        {currentJobListing.maxOpenings}
                    </div>

                    <div class="inline-block font-medium text-white mx-1 text-sm lg:text-md">
                        openings
                    </div>
                </p>
                <div class="col-span-0 sm:col-span-2 text-center hidden sm:block">

                <p class="grid grid-rows-2 mx-auto mb-3 py-1 w-4/5 2lg:w-3/5 rounded-md bg-yellow-400">
                    <div class="inline-block font-medium text-2xl text-white">
                        {currentJobListing.maxApplications}
                    </div>

                    <div class="inline-block font-medium text-white mx-1 text-sm lg:text-md">
                        max apllications
                    </div>
                </p>

                </div>
            </div>

            <div class="col-span-12 sm:col-start-3 sm:col-end-13 px-3 sm:px-0">

                <div class="mt-2">
                    <h3 class=" text-gray-600 font-bold ">
                        {currentJobListing.title}
                    </h3>

                    <h4>
                        {currentJobListing.duration}
                    </h4>

                    <p class="mt-2 text-gray-600 text-sm md:text-md">
                        {currentJobListing.description}
                    </p>
                </div>
                
                <div class="grid grid-cols-2 mt-4 my-auto">
                    <div class="col-span-12 lg:col-span-8">
                        {currentJobListing.skills.map((skill) =>
                        <p class="inline-block rounded-full text-white 
                            bg-red-400 hover:bg-redle-500 duration-300 
                            text-xs font-bold 
                            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                            opacity-90 hover:opacity-100">
                            {skill}
                        </p>)}
                    </div>
                    <div class="col-span-12 sm:col-start-3 sm:col-end-13 px-3 sm:px-0">

                    <div class="mt-2" hidden={currentRole===1 ? false : true} onClick={() => handleSubmitApply()}>
                    <button class="inline-block rounded-full text-white 
                            bg-blue-400 hover:bg-blue-500 duration-300 
                            text-xs font-bold 
                            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                            opacity-90 hover:opacity-100">
                            apply
                        </button>
                    </div>
                    <div class="mt-2" hidden={currentRole==0 && currentJobListing.email === currentEmail ? false : true} onClick={() => handleSubmitCheckApplications()}>
                    <button class="inline-block rounded-full text-white 
                            bg-blue-400 hover:bg-blue-500 duration-300 
                            text-xs font-bold 
                            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                            opacity-90 hover:opacity-100">
                            check applications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    )
}


export default ExpandedDashboard