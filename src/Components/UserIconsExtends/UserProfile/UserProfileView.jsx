import React, { useState } from 'react'
import './UserProfileStyle.css'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { isUserLoggedin } from '../../../Reduxs/action'

const UserProfileView = () => {

  const Loggedinuser = localStorage.getItem('car-relation-user-name')
  const LoggedinuserAffiliation = localStorage.getItem('car-relation-user-AffId')
  const LoggedinuserName = JSON.stringify(Loggedinuser)


    const [passwordChange,setPasswordChnage]=useState(false)
    const [adharVerify,setAdharVerify]=useState(false)



      const UserProfileDispatch = useDispatch()
    //  const UserProfileNavigate = useNavigate()



  const handleLogOut = ()=>{
    localStorage.removeItem('car-relation-user-token')
    localStorage.removeItem('car-relation-user-AffId')
    localStorage.removeItem('car-relation-user-name')
    UserProfileDispatch(isUserLoggedin(0))
    toast.success("Logged Out Successfully")
    window.location.assign('/')

  }



  const handleAdharOption = ()=>{
    setAdharVerify(false)
    toast.success('Adhar service will be available soon')
  }
  const handlePasswordChangeOption = ()=>{
    setPasswordChnage(false)
    toast.success('Password Change service will be available soon')
  }




  return (
    <div className='Profile-View-Main-div'>
        <div className='Profile-View-Sub-div'>
        <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>    
            <div className='Profile-View-top-secton'>
                <div className='User-profile-image'>
                    <img src="https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg" alt="" />
                </div>
                <div className='User-profile-name'>
                    <h4>{LoggedinuserName}</h4>
                </div>
               
            </div>
             <div className='profile-line-down'>

             </div>
             <div className="Profile-User-Details">
                <p><span>Email </span> @gmail.com</p>
                <p><span>Mobile </span> **********</p>
                <p><span>Affiliation </span>{LoggedinuserAffiliation}</p>
                <p><span>Level </span> Primary</p>
                <p><span>Adhar </span> Not Verifed <b onClick={()=>setAdharVerify(true)} className='profile-input-optional'>verify</b></p>
                <div className={adharVerify?'User-Adhar-input-div-active':'User-Adhar-input-div-inactive'}>
                <input className='User-Adhar-input' type="text" placeholder='Enter Adhar Number' />
                <button onClick={handleAdharOption} className='bg-info'>submit</button>
                </div>
                <p><span>Password </span> ******** <b onClick={()=>setPasswordChnage(true)} className='profile-input-optional'>Change Password</b></p>

                <div className={passwordChange?'change-user-password-inputs-active':'change-user-password-inputs-inactive'}>
                    <input type="text" placeholder='Enter old Pasword' />
                    <input type="text" placeholder='Enter New Pasword' />
                    <br />
                    <button onClick={handlePasswordChangeOption}>Save</button>
                    <button onClick={handlePasswordChangeOption}>Don't Save</button>

                </div>
                <div onClick={handleLogOut} className='Profile-user-Logout-div'>
               <i className="fa-solid fa-power-off"></i>
                <h6>LogOut</h6>
                </div>
             </div>
        </div>
    </div>
  )
}

export default UserProfileView