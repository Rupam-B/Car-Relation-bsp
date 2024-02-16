import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const EmployeeDocument = () => {
    const [isPersonalEdit, setIsPersonalEdit]= useState(false)

    const handleEditInfo =()=>{
        setIsPersonalEdit(true)
        setTimeout(() => {
          window.scrollTo({
            top: 500,
            behavior: 'smooth',
          });
        }, 100);
      }


  return (
    <div className='Employee-Salary-main-div'>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/EmployeeMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Your Document</h1>
      </div>


      <hr style={{width:'90%', margin:'auto',marginTop:'3vh'}} />


        <div className="Employee-panel-Personal-section-div">
        <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
        <p><span>Aadhar Number </span>254565872547<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>PAN Number </span>TQ34N76B<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>

        <p><span>Bank Name </span>State Bank of India<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Bank Acc Number </span>3587458798855<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Bank IFSC </span>SBIN000336<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Acc Holder Name </span>Gaurav Chowdhary<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
          
        </div>


        <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
        <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>

        <label htmlFor="firstName">Aadhar Number</label>
        <input type="number" name="firstName" id="firstName"/>
        <label htmlFor="LastName">PAN Number</label>
        <input type="number" name="LastName" id="LastName" />
        <label htmlFor="fatherName">Bank Name</label>
        <input type="text" name="fatherName" id="fatherName" />
        <label htmlFor="DOB">Bank Acc Number</label>
        <input type="text" name="DOB" id="DOB" />
        <label htmlFor="address">Bank IFSC</label>
        <input type="text" name="address" id="address" />
        <label htmlFor="phonePersonal">Acc Holder Name</label>
        <input type="text" name="phonePersonal" id="phonePersonal"/>
        <div className="Employee-panel-Personal-section-Edit-div-button">
        <button>Save</button>
        </div>
        
        </div>


      </div>
      </div>

  )
}

export default EmployeeDocument