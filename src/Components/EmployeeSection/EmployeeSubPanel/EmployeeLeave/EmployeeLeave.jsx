import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeLeaveStyle.css'
import { toast } from 'react-toastify';
import BaseURL from '../../../../apiconfig';


const EmployeeLeave = () => {

  const userToken = localStorage.getItem("car-relation-user-token");

    const [selectedDate, setSelectedDate] = useState(null);
    const [reason, setReason] = useState();
    const currentDate = new Date();


    const LeaveApply = async()=>{
      if(selectedDate&&reason){
      // setWaitWhileUpdating(true)
      try{
        const formData = new FormData();
        formData.append('date',selectedDate)
        formData.append('reason',reason)
        const response = await fetch (`${BaseURL}/emp/leave-apply`,{
          method:'POST',
          headers:{
            Accept:'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body:formData
        })
    
        const EmployeeRecdata = await response.json();
    
        if(response.ok){
          // console.log(EmployeeRecdata)
          // setIsPersonalEdit(false)
          toast.success('Leave Application Subbmitted Succesfully')
          window.location.reload()
        }
        else{
          console.log(EmployeeRecdata)
          toast.error(EmployeeRecdata.message)
        }
      }
      catch(error){
        console.log(error)
       toast.error(error.message)
      }
      // finally{
      //   setWaitWhileUpdating(false)
      // }
    }

    else{
      toast.error('Fill All Details')
    }
    }
  return (
<div className='Employee-Salary-main-div'>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/EmployeeMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Apply Leave</h1>
      </div>

      <hr style={{width:'90%', margin:'auto',marginTop:'3vh'}} />

      <div className='Employee-Leave-mid-panel'>
      <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            const formattedDate = date.toLocaleDateString('en-CA');
            setSelectedDate(formattedDate);
          }}
          minDate={currentDate}
          dateFormat="dd/MM/yyyy" // You can customize the date format
          placeholderText="Select a date"
        />

      <label htmlFor="reasonForLeave"></label>
      <textarea onChange={(e)=>setReason(e.target.value)} type="text" id='reasonForLeave' placeholder='Reason for leave' />

      <button onClick={LeaveApply} className='Employee-Leave-apply-button-button'>Apply Now</button>
      {/* <button  className='Employee-Leave-apply-button-button'>Apply Now</button> */}

      </div>
      </div>
      </div>
  )
}

export default EmployeeLeave