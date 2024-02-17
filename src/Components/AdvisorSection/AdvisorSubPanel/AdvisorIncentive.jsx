import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdvisorIncentive = () => {
    const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  },[isLoading])
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
        <label htmlFor="selectMonth">Select Month : </label>
        <select name="selectMonth" id="selectMonth" onChange={()=>setIsLoading(true)}>
            <option value="January">January</option>
            <option value="January">February</option>
            <option value="January">March</option>
            <option value="January">April</option>
            <option value="January">May</option>
            <option value="January">June</option>
            <option value="January">July</option>
            <option value="January">August</option>
            <option value="January">September</option>
            <option value="January">October</option>
            <option value="January">November</option>
            <option value="January">December</option>

        </select>
        </div>
      </div>


{isLoading?(<div className='Employee-Salary-Loading-div'><h6>Loading...</h6></div>):(<>

    <div style={{backgroundColor:'transparent', fontWeight:'bold',marginBottom:'0'}} className='Employee-Salary-show-salary-div'>
        <div  style={{marginBottom:'0'}} className='Employee-Salary-show-salary-div-interior'><p style={{border:'none'}}className='Employee-Salary-show-para-one-advisor'>Deals</p><p style={{border:'none'}} className='Employee-Salary-show-para-three-advisor'>Type</p> <p className='Employee-Salary-show-para-two-advisor'>Amount</p></div>
      </div>

      <div style={{marginTop:'0'}} className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one-advisor'>Mahindra XUV Altroz CG10AB2060</p><p className='Employee-Salary-show-para-three-advisor'>Car</p> <p className='Employee-Salary-show-para-two-advisor'>500</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one-advisor'>Tata XUV Altroz CG10AB2065</p><p className='Employee-Salary-show-para-three-advisor'>Finance</p> <p className='Employee-Salary-show-para-two-advisor'>1500</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one-advisor'>Nissan Ounch CG10AB2069</p><p className='Employee-Salary-show-para-three-advisor'>Insurance</p> <p className='Employee-Salary-show-para-two-advisor'>800</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one-advisor'>Nissan Ounch CG10AB2069</p><p className='Employee-Salary-show-para-three-advisor'>Car</p> <p className='Employee-Salary-show-para-two-advisor'>800</p></div>
        
      </div>


     


      <div className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-one'>Total Released</p> 
        <p style={{fontWeight:'bold',fontSize:'1.2rem'}} className='Employee-Salary-show-para-two'>31,200</p></div>
      </div>
      </>)}

      </div>
      </div>
  )
}

export default AdvisorIncentive