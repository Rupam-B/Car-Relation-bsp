import React, { useState } from 'react'
import './NotificationPageStyle.css'
import { Link } from 'react-router-dom'

const NotificationPage = () => {

  const [financeOpen , setFinanceOpen] = useState(false)
  const [rTOOpen , setRTOOpen] = useState(false)
  const [insuranceOpen , setInsuranceOpen] = useState(false)


  const openFinance = ()=>{
    setFinanceOpen(!financeOpen)
    setInsuranceOpen(false)
    setRTOOpen(false)
  }
  const openRTO = ()=>{
    setRTOOpen(!rTOOpen)
    setFinanceOpen(false)
    setInsuranceOpen(false)
  }
  const openInsurance = ()=>{
    setInsuranceOpen(!insuranceOpen)
    setRTOOpen(false)
    setFinanceOpen(false)
  }
  return (
    <div className="User-Affliation-sub-div">
    <Link to={"/UserDashboard"}>
      <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
    </Link>
    <div className="Affliation-Top-Heading">
      <h1>Notifications</h1>
    </div>
    <div className="Affliation-top-head-line"></div>
    <div className="User-Adds-List-add-content-sub">

      <div className='Notification-tab-div'>
      <div onClick={openFinance} className={financeOpen?"User-Adds-List-add-showing-div Notifications-heading-divs-active":"User-Adds-List-add-showing-div Notifications-heading-divs"}>
        <h3 >Finance</h3>
        {/* <i  className={financeOpen?"fa-solid fa-angle-up":"fa-solid fa-angle-down"}></i> */}
    </div>
    <div onClick={openRTO} className={rTOOpen?"User-Adds-List-add-showing-div Notifications-heading-divs-active":"User-Adds-List-add-showing-div Notifications-heading-divs"}>
        <h3 >RTO</h3>
        {/* <i  className={rTOOpen?"fa-solid fa-angle-up":"fa-solid fa-angle-down"}></i> */}
    </div>
    <div onClick={openInsurance} className={insuranceOpen?"User-Adds-List-add-showing-div Notifications-heading-divs-active":"User-Adds-List-add-showing-div Notifications-heading-divs"}>
        <h3 >Insurance</h3>
        {/* <i  className={insuranceOpen?"fa-solid fa-angle-up":"fa-solid fa-angle-down"}></i> */}
    </div>

      </div>
    
    <div style={{backgroundColor:'rgb(216, 112, 147,0.03)'}} className={financeOpen?"User-Adds-List-add-showing-div":"Notifications-content-Close"}>
      <h5>Finance Details</h5>
    </div>
   
    <div style={{backgroundColor:'rgb(216, 112, 147,0.03)'}} className={rTOOpen?"User-Adds-List-add-showing-div":"Notifications-content-Close"}>
    <h5>RTO Details</h5>
    </div>
   
    <div style={{backgroundColor:'rgb(216, 112, 147,0.03)'}} className={insuranceOpen?"User-Adds-List-add-showing-div":"Notifications-content-Close"}>
    <h5>Insurance Details</h5>
    </div>

    </div>

</div>
  )
}

export default NotificationPage