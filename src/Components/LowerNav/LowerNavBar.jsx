import React from 'react'
import './LowerNavStyle.css'

const LowerNavBar = () => {
  return (
    <div className='LowerNav-main-div'>
        <div className='Lower-Nav-Sub-div'>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
    </div>
  )
}

export default LowerNavBar