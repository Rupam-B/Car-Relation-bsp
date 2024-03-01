import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseURL from '../../../apiconfig';

const AdvisorIncentive = () => {

  const userToken = localStorage.getItem("car-relation-user-token");

    const [isLoading, setIsLoading] = useState(false)
    const [chooseMonth, setChooseMonth] = useState()

    const [incentiveData, setIncentiveData] = useState()
  

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },500)
  },[isLoading])




  const FetchsIncentiveData = async()=>{
    setIsLoading(true)
    
    try{
      const formData = new FormData();
      formData.append('month',chooseMonth)
  
      const response = await fetch (`${BaseURL}/adv/get-incentive`,{
        method:'POST',
        headers:{
          Accept:'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body:formData
      })
  
      const EmployeeRecdata = await response.json();
  
      if(response.ok){
        console.log(EmployeeRecdata)
        setIncentiveData(EmployeeRecdata.data)
        
      }
      else{
        // console.log(EmployeeRecdata)
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
        FetchsIncentiveData();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [chooseMonth]);



  return (
    <div className='Employee-Salary-main-div'>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/AdvisorMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Your Incentive</h1>
      </div>

      <hr style={{width:'90%', margin:'auto',marginTop:'3vh', marginBottom:'3vh'}} />

      <div className='Employee-Salary-select-div'>
        <p>Year : 2024</p>


        <div className='Employee-Salary-select-div-interior'>
        <input type="month" onChange={FetchAttendance}/>
        </div>
      </div>


{isLoading?(<div className='Employee-Salary-Loading-div'><h6>Loading...</h6></div>):(

incentiveData?(

  incentiveData&&incentiveData.length>0?
        (
          

        <div>
      <div style={{backgroundColor:'transparent', fontWeight:'bold',marginBottom:'0'}} className='Employee-Salary-show-salary-div'>
        <div  style={{marginBottom:'0'}} className='Employee-Salary-show-salary-div-interior'><p style={{border:'none'}}className='Employee-Salary-show-para-one-advisor'>Deals</p><p style={{border:'none'}} className='Employee-Salary-show-para-three-advisor'>Type</p> <p className='Employee-Salary-show-para-two-advisor'>Amount</p></div>
      </div>
      {incentiveData.map((items, index)=>(
      <div key={index} style={{marginTop:'0'}} className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one-advisor'>{items.description}</p><p className='Employee-Salary-show-para-three-advisor'>{items.service}</p> <p className='Employee-Salary-show-para-two-advisor'>{items.incentive_amount}</p></div>
      </div>
      ))
      }
      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-one'>Total Released</p> 
        <p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-two'>
        {
        incentiveData.map((items) => {
          return Number(items.incentive_amount) || 0;
        }).reduce((acc, amount) => acc + amount, 0)
      }
          </p>
          </div>
      </div>
      </div>

      
      )
    :(
    <div style={{height:'30vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
    <h6>Incentive Not Generated For This Month !!</h6>
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

export default AdvisorIncentive