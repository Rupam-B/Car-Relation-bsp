import React from 'react'
import './MiddleNavStyle.css'
// import { Link } from 'react-router-dom'


const MiddleNavbar = () => {
  return (
    <div className='Middle-nav-main-div'>
        <div className='Middle-nav-sub-div'>
            <div className='Middle-nav-left-div'>
                {/* <img src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-yellow-carcarvehicletransportford-961524665802mhbcd.png" alt="" /> */}
                <img src={process.env.PUBLIC_URL + '/NEW-LOGO1.png'} alt="" />
                <h2><i class="fa-solid fa-phone-volume"></i>1231231230</h2>
            </div>
            {/* <div className='Middle-nav-right-div'>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>About</Link>
                <Link to={'/'}>Contact</Link>
               
            </div> */}
        </div>
    </div>
  )
}

export default MiddleNavbar