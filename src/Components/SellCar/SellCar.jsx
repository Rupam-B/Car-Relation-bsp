import React from 'react'
import './sellcarStyle.css'
import { Link } from 'react-router-dom'

const SellCar = () => {
  return (
    <div className='SellCar-main-div'>
        <div className='SellCar-sub-div'>
            <div className='SellCar-top-heading'>
            <h1>Enter Car Details</h1>
          <div className='buy-sell-btn'>
            <Link to={'/SellCarPortal'} className='buy-sell-btn-one'>Sell</Link>
            <Link to={'/'} className='buy-sell-btn-two'>Buy</Link>
          </div>
            </div>
        </div>
    </div>
  )
}

export default SellCar