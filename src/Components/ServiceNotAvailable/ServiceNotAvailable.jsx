import React from 'react'
import './ServiceNotAvailableStyle.css'
import { useNavigate } from 'react-router-dom'

const ServiceNotAvailable = () => {
    const navigate = useNavigate()

    const handleCloseButtonClick = () => {
        navigate('/UserDashboard');
      };


  return (
    <div className='ServiceNotAvailable-main-div'>
        <h5 style={{textAlign:'center'}}>This Service is Only for <br /> Advisor/ Employee!!</h5>
        <button onClick={handleCloseButtonClick}>Close</button>
    </div>
  )
}

export default ServiceNotAvailable