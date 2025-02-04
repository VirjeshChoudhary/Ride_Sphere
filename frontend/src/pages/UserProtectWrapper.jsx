/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const {user,setUser}=useContext(UserDataContext);
    const navigate=useNavigate();
    const [isLoading, setIsLoading] =useState(true);
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
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
    <div>{children}</div>
  )
}

export default UserProtectWrapper