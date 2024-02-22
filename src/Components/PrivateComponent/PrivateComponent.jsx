import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {

    const auth = localStorage.getItem('car-relation-user-token')
  return auth?<Outlet/>:<Navigate to={'/UserMainPanel'}/>
}

export default PrivateComponent