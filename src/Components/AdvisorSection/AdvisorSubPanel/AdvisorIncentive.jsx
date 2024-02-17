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
        <div  style={{marginBottom:'0'}} className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Deals</p> <p className='Employee-Salary-show-para-two'>Amount</p></div>
      </div>

      <div style={{marginTop:'0'}} className='Employee-Salary-show-salary-div'>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Mahindra XUV Altroz CG10AB2060</p> <p className='Employee-Salary-show-para-two'>500</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Tata XUV Altroz CG10AB2065</p> <p className='Employee-Salary-show-para-two'>1500</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Nissan Ounch CG10AB2069</p> <p className='Employee-Salary-show-para-two'>800</p></div>
        <div className='Employee-Salary-show-salary-div-interior'><p className='Employee-Salary-show-para-one'>Net Commision</p> 
        <p style={{fontWeight:'bold'}} className='Employee-Salary-show-para-two'>26,200</p></div>
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