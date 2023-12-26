import React from 'react'
import './UserProfileStyle.css'

const UserProfileView = () => {
  return (
    <div className='Profile-View-Main-div'>
        <div className='Profile-View-Sub-div'>
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
                <p><span>Adhar </span> Not Verifed <b className='profile-input-optional'>verify</b></p>
             </div>
        </div>
    </div>
  )
}

export default UserProfileView