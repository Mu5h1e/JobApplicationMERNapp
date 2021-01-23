import React, { useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { authenticate, isAuth } from '../helpers/auth.helper'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { useHistory , useLocation} from "react-router-dom";


const ApplicationListings = () => {

    // let [activeJobListing, setactiveJobListing] = React.useState()
    const location = useLocation()
    const jobId = location.state.params
    console.log(location.state.params)
    // useEffect(() => {
    //     loadData();
    //   }, []);

      const loadData = () => {
          const data = jobId
        const url = "http://localhost:5000/api/show-applications"
        axios.post(url, data)
        .then(res => {
            // setactiveJobListing(res.data)
            console.log(res.data)
            })
    }  
    loadData()
}

export default ApplicationListings