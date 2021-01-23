import React, { useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth, getCookie } from '../helpers/auth.helper'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {Redirect} from 'react-router-dom'
import { useHistory , useLocation} from "react-router-dom";


const ApplicationListings = () => {

    let [activeJobListing, setactiveJobListing] = React.useState([])
    let [activeUser, setActiveUser] = React.useState({
        name: '',
        email: '',
        role: '',
        skills: [],
        rating: null
    })

    const location = useLocation()
    const jobId = location.state.params
    console.log(location.state.params)
    useEffect(() => {
        loadData();
        // loadUserData()
      }, []);

    const loadData = () => {
        const data = jobId
        const url = "http://localhost:5000/api/show-applications"
        axios.post(url, data)
        .then(res => {
            setactiveJobListing(res.data)
            })
    } 

    const loadUserData = (applicantId) => {
        const data = {_id: applicantId}
        console.log(applicantId)
        const url = "http://localhost:5000/api/user"
        axios.post(url, data)
        .then(res => {
            const { name, email, role, skills, rating} = res.data
            setActiveUser({...activeUser, name, email, role, skills, rating})
        })
    }

    const load = (applicantId) => {
        loadUserData(applicantId)
    }
    return (
        <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
            <div>
                <h2 className="text-2xl font-semibold leading-tight">Jobs</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">

                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search by name"
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden"z>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    candidate
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Created at
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    view details
                                </th>
                            </tr>
                        </thead>
                        {activeJobListing.map((listing, index) => {
                            load(listing.applicantId)
                            return(<tbody>
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {activeUser.name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {listing.createdAt.substr(0,10)}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Active</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-purple-200 opacity-50 rounded-full"></span>
                                        <span className="relative">
                                            <button onClick={() => console.log()}>expand</button>
                                        </span>
                                    </span>
                                </td>
                            </tr>
                                
                        </tbody>)})}

                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ApplicationListings