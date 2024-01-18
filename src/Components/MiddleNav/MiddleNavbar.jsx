import React from 'react'
import './MiddleNavStyle.css'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'


const MiddleNavbar = () => {
  const userVerify =localStorage.getItem('car-relation-user-token')
  return (
    <div className='Middle-nav-main-div'>
        <div className='Middle-nav-sub-div'>
            <div className='Middle-nav-left-div'>
              {userVerify?<div className='user-logged-in-bars'>
              <Link  to={'/UserDashboard'}><i style={{color:'#eb7a9a', fontSize:'1.3rem'}} className="fa-solid fa-bars "></i></Link>
              </div>:
              <div className='mobile-user-login-div'>
              <Link style={{color:'#eb7a9a'}} to={'/UserMainPanel'}><i style={{color:'#eb7a9a'}} className="fa-solid fa-user use-panel-login-icon"></i></Link>
              <p style={{color:'#eb7a9a'}}>Login</p>
              </div>
              }
                {/* <img src="https://purepng.com/public/uploads/large/purepng.com-ford-focus-yellow-carcarvehicletransportford-961524665802mhbcd.png" alt="" /> */}
                <img src={process.env.PUBLIC_URL + '/NEW-LOGO2.png'} alt="" />
                <h2><i className="fa-solid fa-phone-volume"></i>1231231230</h2>
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