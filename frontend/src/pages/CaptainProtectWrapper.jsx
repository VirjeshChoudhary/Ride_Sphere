/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    const { captain, setCaptain } = useContext(CaptainDataContext)
    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.status===200){
                
                setCaptain(response.data)   //captain put bcz we sent the data as key with captain , (after some time ) now i corrected from backend
                setIsLoading(false)
            }
        }).catch(error => {
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    },[token])
    if(isLoading){
        return <div>Loading...</div>
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectWrapper