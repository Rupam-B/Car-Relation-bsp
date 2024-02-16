import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeLeaveStyle.css'

const EmployeeLeave = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log(date)
    };
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
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy" // You can customize the date format
          placeholderText="Select a date"
        />

      <label htmlFor="reasonForLeave"></label>
      <textarea type="text" id='reasonForLeave' placeholder='Reason for leave' />

      <button className='Employee-Leave-apply-button'>Apply Now</button>

      </div>
      </div>
      </div>
  )
}

export default EmployeeLeave