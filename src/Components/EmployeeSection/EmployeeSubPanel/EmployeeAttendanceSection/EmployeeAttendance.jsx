
import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BaseURL from '../../../../apiconfig'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EmployeeAttendance = () => {
  const userToken = localStorage.getItem("car-relation-user-token");

    const [isLoading, setIsLoading] = useState(false)
    const [chooseMonth, setChooseMonth] = useState()
    const [currentYear, setCurrentYear] = useState()


    const [attendanceData, setAttendanceData] = useState()


   
    useEffect(()=>{
      setTimeout(()=>{
        if(chooseMonth){
          setCurrentYear(chooseMonth.slice(0,4))
        }
      },1000)
    },[chooseMonth])


   


    const FetchsAttendanceData = async()=>{
      setIsLoading(true)
      try{
        const formData = new FormData();
        formData.append('month',chooseMonth)
    
        const response = await fetch (`${BaseURL}/emp/get-monthly-attendance`,{
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
          setAttendanceData(EmployeeRecdata.data)
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
      finally{
        setIsLoading(false)
      }
    }

    const FetchAttendance = (e)=>{
      setChooseMonth(e.target.value)
    }

    useEffect(() => {
      if (chooseMonth) {
        setTimeout(() => {
          FetchsAttendanceData();
        }, 500);
      }
      // eslint-disable-next-line
    }, [chooseMonth]);
   
  return (
    <div className='Employee-Salary-main-div'>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/EmployeeMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Your Attendace</h1>
      </div>

      <hr style={{width:'90%', margin:'auto',marginTop:'3vh', marginBottom:'3vh'}} />
      <div className='Employee-Salary-select-div'>
        <p>Year : {currentYear?currentYear:''}</p>


        <div className='Employee-Salary-select-div-interior'>
        <input id='SelectAttendance' type="month" onChange={FetchAttendance}/>
        <label htmlFor="SelectAttendance">Select</label>
        </div>
      </div>


{isLoading?(<div className='Employee-Salary-Loading-div'><h6>Loading...</h6></div>):(

  chooseMonth?(

    attendanceData?(
    <>
      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Total days</p> <p className='Employee-Salary-show-para-two'>{attendanceData&&attendanceData.working_days?attendanceData.working_days:''}</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p style={{color:'green'}} className='Employee-Salary-show-para-one'>Presnt</p> <p className='Employee-Salary-show-para-two'>{attendanceData.present_days}</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p style={{color:'orange'}}  className='Employee-Salary-show-para-one'>Leaves</p> <p className='Employee-Salary-show-para-two'>{attendanceData.leave}</p></div>
      </div>
      </>
    ):(
      <></>
    )
  ):(
    <div style={{display:'flex', justifyContent:'center', backgroundColor:'transparent'}} className='Employee-Salary-show-salary-div'>
        <h6>Choose Month !!</h6>
      </div>
  )
      
      )}
      </div>
      
      </div>
  )
}

export default EmployeeAttendance