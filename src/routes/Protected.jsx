import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const { token } = useAuth()
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Protected