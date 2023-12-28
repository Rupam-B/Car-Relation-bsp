import React, { useState } from 'react'
import './UserProfileStyle.css'
import { Link} from 'react-router-dom'

const UserProfileView = () => {
    const [passwordChange,setPasswordChnage]=useState(false)
    const [adharVerify,setAdharVerify]=useState(false)
  return (
    <div className='Profile-View-Main-div'>
        <div className='Profile-View-Sub-div'>
        <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>    
            <div className='Profile-View-top-secton'>
                <div className='User-profile-image'>
                    <img src="https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg" alt="" />
                </div>
                <div className='User-profile-name'>
                    <h4>Siddhi Softwares</h4>
                </div>
               
            </div>
             <div className='profile-line-down'>

             </div>
             <div className="Profile-User-Details">
                <p><span>Email </span> siddhisoftwares@gmail.com</p>
                <p><span>Mobile </span> 9876543210</p>
                <p><span>Affiliation </span> 876FGY54R</p>
                <p><span>Level </span> Primary</p>
                <p><span>Adhar </span> Not Verifed <b onClick={()=>setAdharVerify(true)} className='profile-input-optional'>verify</b></p>
                <div className={adharVerify?'User-Adhar-input-div-active':'User-Adhar-input-div-inactive'}>
                <input className='User-Adhar-input' type="text" placeholder='Enter Adhar Number' />
                <button onClick={()=>setAdharVerify(false)} className='bg-info'>submit</button>
                </div>
                <p><span>Password </span> ******** <b onClick={()=>setPasswordChnage(true)} className='profile-input-optional'>Change Password</b></p>

                <div className={passwordChange?'change-user-password-inputs-active':'change-user-password-inputs-inactive'}>
                    <input type="text" placeholder='Enter New Pasword' />
                    <input type="text" placeholder='Re-Enter New Pasword' />
                    <br />
                    <button onClick={()=>setPasswordChnage(false)}>Save</button>
                    <button onClick={()=>setPasswordChnage(false)}>Don't Save</button>

                </div>
             </div>
        </div>
    </div>
  )
}

export default UserProfileView