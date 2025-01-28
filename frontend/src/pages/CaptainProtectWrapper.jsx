/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    const {user,setUser}=useContext(UserDataContext);
    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.status===200){
                setUser(response.data)
                setIsLoading(false)
            }
        }).catch(error => {
            localStorage.removeItem('token')
            navigate('/login')
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