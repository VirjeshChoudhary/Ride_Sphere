/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserLogout = () => {
    const navigate=useNavigate()
    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/login');
            }
        };
        logout();
    })

  return (
    <div>
        User Logout
    </div>
  )
}

export default UserLogout