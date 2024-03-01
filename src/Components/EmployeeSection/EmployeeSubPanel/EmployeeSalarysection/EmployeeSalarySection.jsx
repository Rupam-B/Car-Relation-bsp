import React, { useEffect, useState } from 'react'
import '../EmployeeSalarysection/EmployeeSalaryStyle.css'
import { Link } from 'react-router-dom'
import BaseURL from '../../../../apiconfig';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeSalarySection = () => {

  const userToken = localStorage.getItem("car-relation-user-token");

  const [isLoading, setIsLoading] = useState(false)
  const [chooseMonth, setChooseMonth] = useState()
  const [salaryData, setSalaryData] = useState()



  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  },[isLoading])

  


  const FetchsalaryData = async()=>{
    setIsLoading(true)
    try{
      const formData = new FormData();
      formData.append('month',chooseMonth)
  
      const response = await fetch (`${BaseURL}/emp/get-salary`,{
        method:'POST',
        headers:{
          Accept:'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body:formData
      })
  
      const EmployeeRecdata = await response.json();
  
      if(response.ok){
        // console.log(EmployeeRecdata.data)
        setSalaryData(EmployeeRecdata.data)
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


  useEffect(() => {
    if (chooseMonth) {
      setTimeout(() => {
        FetchsalaryData();
      }, 500);
    }
    // eslint-disable-next-line
  }, [chooseMonth]);


  
  return (
    <div className='Employee-Salary-main-div'>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/EmployeeMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Your Salary</h1>
      </div>

      <hr style={{width:'90%', margin:'auto',marginTop:'3vh', marginBottom:'3vh'}} />

      <div className='Employee-Salary-select-div'>
        <p>Year : 2024</p>


        <div className='Employee-Salary-select-div-interior'>
          <>
        <input type="month" onChange={(e)=>setChooseMonth(e.target.value)}/>
          </>
        </div>
      </div>


{isLoading?(<div className='Employee-Salary-Loading-div'><h6>Loading...</h6></div>):(

salaryData?(

salaryData&&salaryData.length>0?
      (
        salaryData.map((items, index)=>(
      <div key={index}>
      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Total Days</p> <p className='Employee-Salary-show-para-two'>{items.working_days?items.working_days:''}</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Present </p> <p className='Employee-Salary-show-para-two'>{items.present_days?items.present_days:''}</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Salary</p> <p className='Employee-Salary-show-para-two'>{items.salary_amount?items.salary_amount:''}</p></div>

      </div>
      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Incentives</p> <p className='Employee-Salary-show-para-two'>{items.incentive_amount?items.incentive_amount:''}</p></div>
      </div>
      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-one'>Total Released</p> 
        <p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-two'>{items.total_salary?items.total_salary:''}</p></div>
      </div>
      </div>
      ))
      )
      :(
      <div style={{height:'30vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
      <h6>Salary Not Generated For This Month !!</h6>
      </div>
      )

    ):(
     <div style={{height:'30vh', display:'flex',justifyContent:'center',alignItems:'center'}}>Choose Month !!!</div>
    )



      )}




      </div>
      </div>
  )
}

export default EmployeeSalarySection