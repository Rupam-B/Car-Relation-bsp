import React, { useState } from 'react'
import './UpperNavStyle.css'

const UpperNavbar = () => {
    const [adminLogin, setAdminLogin]= useState(false)
    const [adminDashboardShow, setAdminDashboardShow]= useState(false)
    const [adminLoginId, setAdminLoginId]= useState('')
    const [adminLoginpassword, setAdminLoginpassword]= useState('')

    const AdminCheck = ()=>{

      if(adminLoginId==="Siddhi" && adminLoginpassword==="Siddhi@123"){
        setAdminDashboardShow(true)
        setAdminLogin(false)
      }
      else {
        alert("Wrong Credentials")
      }
    }
    
  return (
    <div className='Up-Navbar-Main-div'>
        <div className='Up-Navbar-Sub-div'>
        <div className="Up-Nav-left-div">
          
        <i className="fa-solid fa-phone"></i>
        <p>1-800-458-56789</p>
        <i className="fa-solid fa-book"></i>
        <p>23 Bakery Street, London, UK</p>
        <i className="fa-regular fa-clock"></i>
        <p>Mon - Fri 8:00 - 18:00</p>
        </div>
        <div className="Up-Nav-right-div">
        <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
        <a href="https://www.google.com/"><i className="fa-brands fa-twitter"></i></a>
        
        
        <h6 onClick={()=>setAdminLogin(true)}>Admin</h6>
        </div>
        </div>
        <hr style={{marginTop:'-0.2vh',marginBottom:'0'}}/>

        {/* ------Admin Login Section------ */}
        <div  className={adminLogin?'Admin-Login-show':'Admin-Login-hide'}>
          <div className='Admin-login-sub-div'>
          <i onClick={()=>setAdminLogin(false)} className="fa-solid fa-x"></i>
            <h1>Admin Login</h1>
            <input value={adminLoginId} onChange={(e)=>setAdminLoginId(e.target.value)} type="text" placeholder='User Id' />
            <input value={adminLoginpassword} onChange={(e)=>setAdminLoginpassword(e.target.value)} type="text" placeholder='Password' />
            <button onClick={AdminCheck}>Login</button>
          </div>
        </div>

         {/* ------Admin DashBoard Section------ */}
         <div  className={adminDashboardShow?'Admin-Dashboard-show':'Admin-Dashboard-hide'}>
         <i onClick={()=>setAdminDashboardShow(false)} className="fa-solid fa-x"></i>
          <h1>Welcome Admin</h1>

         </div>


    </div>
  )
}

export default UpperNavbar