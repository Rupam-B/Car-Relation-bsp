import React from 'react'
import './UserRoyalityStyle.css'
import { Link} from 'react-router-dom'

const UserRoyality = () => {



    const winData = [
        {
          id:1,
          won:"20",
          date:'25.12.2023',
          Referral:'5467DYFG',
          eid:'SIDD456TRES',
          icon:'diamond',
          color:'rgb(132, 0, 255)'
        },
        {
          id:2,
          won:"30",
          date:'15.12.2023',
          Referral:'8767DYFG',
          eid:'SIDD456TBHGR',
          icon:'coins',
          color:'rgb(255, 145, 0)'
        },
        {
          id:3,
          won:"10",
          date:'15.9.2023',
          Referral:'5467FGTRG',
          eid:'SIDD456VGGTG',
          icon:'diamond',
          color:'rgb(132, 0, 255)'
        },
        {
          id:4,
          won:"30",
          date:'25.7.2023',
          Referral:'5467DYFG',
          eid:'SIDD456TRES',
          icon:'coins',
          color:'rgb(255, 145, 0)'
        },
        {
          id:5,
          won:"40",
          date:'6.6.2023',
          Referral:'59KI76YFG',
          eid:'SIDD4DF6654',
          icon:'diamond',
          color:'rgb(132, 0, 255)'
        },
      ]
    
  return (
    <div className='User-Royality-main-div'>
      <div className='User-Royality-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>

        <div  className='Royality-Top-Heading'>
        <h1>Your Royality</h1>
        </div>
        <div className='Royality-top-head-line'></div>
        <div className='Royality-points-show'>
            <div className='Royality-points-show-one'>
            <i className="fa-solid fa-coins"></i>
            <p>collected royality points: <span>60</span></p>
            </div>
            <div className='Royality-points-show-two'>
            <i className="fa-solid fa-diamond"></i>
            <p>collected royality diamonds: <span>70</span></p>
            </div>

        </div>

        {winData.map((winitems)=>(
      <div key={winitems.id} className="Royality-add-content-sub">
        <div  className='Royality-add-showing-div-scratched'>
        <i  style={{color:winitems.color, fontSize:'2rem', marginLeft:'2vw'}} className={`fa-solid fa-${winitems.icon} Royality-top-icon`}></i>
          <h6 className='Royality-main-description'>You got <span style={{color:winitems.color}}>{winitems.won} {winitems.icon}</span> for your successfull referral with referal id mentioned below </h6>
          <div className='Royality-add-showing-div-below'>
          <p >Ref no: {winitems.Referral}</p>
          <p >{winitems.date}</p>
          </div>

        </div>

      </div>
      ))}
      </div>
    </div>
  )
}

export default UserRoyality