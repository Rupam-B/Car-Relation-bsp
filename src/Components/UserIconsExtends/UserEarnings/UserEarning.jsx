// import React, { useState } from 'react'
import React  from 'react'
import './UserEarningStyle.css'
import { Link} from 'react-router-dom'

const UserEarning = () => {
  // const [isScratched, setScratched] = useState(false);
  // const [scratchId, setScratchId] = useState('');

  // const handleScratch = (getId)=>{
  //   setScratched(true)
  //   setScratchId(getId)

  // }



  const winData = [
    {
      id:1,
      won:"180₹ ",
      date:'25.12.2023',
      Referral:'5467DYFG',
      eid:'SIDD456TRES'
    },
    {
      id:2,
      won:"3000₹",
      date:'15.12.2023',
      Referral:'8767DYFG',
      eid:'SIDD456TBHGR'
    },
    {
      id:3,
      won:"1000₹",
      date:'15.9.2023',
      Referral:'5467FGTRG',
      eid:'SIDD456VGGTG'
    },
    {
      id:4,
      won:"180₹",
      date:'25.7.2023',
      Referral:'5467DYFG',
      eid:'SIDD456TRES'
    },
    {
      id:5,
      won:"180₹",
      date:'6.6.2023',
      Referral:'59KI76YFG',
      eid:'SIDD4DF6654'
    },
  ]


  return (
    <div className='User-Earning-main-div'>
      <div className='User-Earning-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>

        <div  className='Earning-Top-Heading'>
        <h1>Your Earnings</h1>
        </div>
        <div className='Earning-top-head-line'></div>
        {winData.map((winitems)=>(
      <div key={winitems.id} className="Earning-add-content-sub">
        <div  className='Earning-add-showing-div-scratched'>
          <h4  className='Earning-get-h4'>Deposited <span className='Earning-h4-won'>{winitems.won} <br /></span> <span className='Earning-h4-span'>in your bank acount Ending with XXXX3247</span></h4>
          <p className='Earning-tx-no-para' >Txn no. <span>{winitems.eid}</span></p>

          <div className='Earning-add-showing-div-below'>
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

export default UserEarning