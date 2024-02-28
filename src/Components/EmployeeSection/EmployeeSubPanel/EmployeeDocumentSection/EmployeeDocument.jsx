import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseURL from '../../../../apiconfig';

const EmployeeDocument = () => {

  const userToken = localStorage.getItem("car-relation-user-token");
    const [isPersonalEdit, setIsPersonalEdit]= useState(false)

    const [employeeDetails, setEmployeeDetails]= useState([])


     // change Details section
     const [employeeChangeAadhaar, setEmployeeChangeAadhaar]= useState()
     const [employeeChangePAN, setEmployeeChangePAN]= useState()
     const [employeeChangeBankName, setEmployeeChangeBankName]= useState()
     const [employeeChangeBankIFSC, setEmployeeChangeBankIFSC]= useState()
     const [employeeChangeBankAccNo, setEmployeeChangeBankAccNo]= useState()
     const [employeeChangeAccHolderName, setEmployeeChangeAccHolderName]= useState()

     const [waitWhileUpdating, setWaitWhileUpdating] = useState(false);

    const handleEditInfo =()=>{
        setIsPersonalEdit(true)

        setEmployeeChangeAadhaar(employeeDetails.aadhaar)
    setEmployeeChangePAN(employeeDetails.pan)
    setEmployeeChangeBankName(employeeDetails.bank_name)
    setEmployeeChangeBankIFSC(employeeDetails.bank_ifsc)
    setEmployeeChangeBankAccNo(employeeDetails.bank_account_no)
    setEmployeeChangeAccHolderName(employeeDetails.bank_account_holder_name)
        setTimeout(() => {
          window.scrollTo({
            top: 500,
            behavior: 'smooth',
          });
        }, 100);
      }
      


      // For Employee Doc Change
const changeEmployeeData = async()=>{
  setWaitWhileUpdating(true)
  try{
    const formData = new FormData();
    formData.append('aadhaar',employeeChangeAadhaar)
    formData.append('pan',employeeChangePAN)
    formData.append('bank_name',employeeChangeBankName)
    formData.append('bank_account_no',employeeChangeBankAccNo)
    formData.append('bank_ifsc',employeeChangeBankIFSC)
    formData.append('bank_account_holder_name',employeeChangeAccHolderName)

    const response = await fetch (`${BaseURL}/profile/emp-doc-update`,{
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
      setIsPersonalEdit(false)
      localStorage.setItem('car-relation-user-aadhaar', EmployeeRecdata.data.aadhaar)
      window.location.reload()
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
    setWaitWhileUpdating(false)
  }
}

      // For Fetching Employee Docs
      useEffect(()=>{
        const fetchEmployeeDtails = async ()=>{
          try{
            const response = await axios.get(`${BaseURL}/profile/emp-doc`,{
              mode:'no-cors',
              headers:{
                  Accept:'application/json',
                  Authorization: `Bearer ${userToken}`,
              }
            })
            if(response.status>=200&&response.status<300){
              const data = response.data
            if(data){
              // console.log(data)
              setEmployeeDetails(data.data)
            }    
            }
            else{
              console.log('Network status was not OK')
            }
          }
          catch(error){
            console.log(error)
            toast.error(error.message)
          }
    
        }
    
        fetchEmployeeDtails();
    
      },[userToken])


  return (
    <div className='Employee-Salary-main-div'>
      <div className={waitWhileUpdating?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Updating...</h4>
      </div>
    <div className='Employee-Salary-sub-div'>
    <Link to={'/EmployeeMainPanel'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
      <div  className='Employee-Salary-Top-Heading'>
      <h1>Your Document</h1>
      </div>


      <hr style={{width:'90%', margin:'auto',marginTop:'3vh'}} />


        <div className="Employee-panel-Personal-section-div">
        <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
        <p><span>Aadhar Number </span>{employeeDetails.aadhaar?employeeDetails.aadhaar:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>PAN Number </span>{employeeDetails.pan?employeeDetails.pan:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>

        <p><span>Bank Name </span>{employeeDetails.bank_name?employeeDetails.bank_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Bank Acc Number </span>{employeeDetails.bank_account_no?employeeDetails.bank_account_no:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Bank IFSC </span>{employeeDetails.bank_ifsc?employeeDetails.bank_ifsc:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Acc Holder Name </span>{employeeDetails.bank_account_holder_name?employeeDetails.bank_account_holder_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
          
        </div>


        <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
        <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>

        <label htmlFor="firstName">Aadhar Number</label>
        <input value={employeeChangeAadhaar} onChange={(e)=>setEmployeeChangeAadhaar(e.target.value)} type="number" name="firstName" id="firstName"/>
        <label htmlFor="LastName">PAN Number</label>
        <input value={employeeChangePAN} onChange={(e)=>setEmployeeChangePAN(e.target.value)} type="text" name="LastName" id="LastName" />
        <label  htmlFor="fatherName">Bank Name</label>
        <input value={employeeChangeBankName} onChange={(e)=>setEmployeeChangeBankName(e.target.value)} type="text" name="fatherName" id="fatherName" />
        <label htmlFor="DOB">Bank Acc Number</label>
        <input value={employeeChangeBankAccNo} onChange={(e)=>setEmployeeChangeBankAccNo(e.target.value)} type="text" name="DOB" id="DOB" />
        <label htmlFor="address">Bank IFSC</label>
        <input value={employeeChangeBankIFSC} onChange={(e)=>setEmployeeChangeBankIFSC(e.target.value)} type="text" name="address" id="address" />
        <label htmlFor="phonePersonal">Acc Holder Name</label>
        <input value={employeeChangeAccHolderName} onChange={(e)=>setEmployeeChangeAccHolderName(e.target.value)} type="text" name="phonePersonal" id="phonePersonal"/>
        <div className="Employee-panel-Personal-section-Edit-div-button">
        <button onClick={changeEmployeeData} className="Employee-panel-Personal-section-Edit-div-button-button">Save</button>
        </div>
        
        </div>


      </div>
      </div>

  )
}

export default EmployeeDocument