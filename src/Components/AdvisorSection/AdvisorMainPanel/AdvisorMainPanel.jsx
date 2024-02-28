import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BaseURL from '../../../apiconfig';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parse, format } from 'date-fns';

const AdvisorMainPanel = () => {

  const userToken = localStorage.getItem("car-relation-user-token");
    const [isPersonalEdit, setIsPersonalEdit]= useState(false)

    const [advDetails, setAdvDetails]= useState([])

    // change Details section
    const [employeeChangeFirstName, setEmployeeChangeFirstName]= useState()
    const [employeeChangelastName, setEmployeeChangelastName]= useState()
    const [employeeChangedob, setEmployeeChangedob]= useState()
    const [employeeChangephone, setEmployeeChangephone]= useState()
    const [employeeChangeAddress, setEmployeeChangeAddress]= useState()

    const [employeeChangeImage, setEmployeeChangeImage]= useState()
    const [employeeChangeImageshow, setEmployeeChangeImageshow]= useState()
    const [employeeImageChanging, setEmployeeImageChanging]= useState(false)

    const [waitWhileUploading, setWaitWhileUploading] = useState(false);
    const [waitWhileUpdating, setWaitWhileUpdating] = useState(false);
    
  const handleEditInfo =()=>{
    setIsPersonalEdit(true)

    setEmployeeChangeFirstName(advDetails.first_name)
    setEmployeeChangelastName(advDetails.last_name)
    const parsedsubmitDate = parse(advDetails.dob, 'dd-MM-yyyy', new Date());
    const formattedsubmitDate = format(parsedsubmitDate, 'yyyy-MM-dd');

    // -----------
    setEmployeeChangedob(formattedsubmitDate)
    setEmployeeChangeAddress(advDetails.address)
    setEmployeeChangephone(advDetails.phone)


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
    formData.append('first_name',employeeChangeFirstName)
    formData.append('last_name',employeeChangelastName)
    formData.append('phone',employeeChangephone)
    formData.append('dob',employeeChangedob)
    formData.append('address',employeeChangeAddress)

    const response = await fetch (`${BaseURL}/profile/adv-update`,{
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
      setIsPersonalEdit(false)
      window.location.reload()
      localStorage.setItem('car-relation-user-name',EmployeeRecdata.data.first_name)
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
    setWaitWhileUpdating(false)
  }
}

const handleImageChange = (event) => {
  const files = event.target.files;
  
  if (files.length > 1) {
    toast.error("You can only upload up to 1 images.");
    return;
  } else {
    setEmployeeChangeImage(files)
      const imageUrl = URL.createObjectURL(files[0]);
    setEmployeeChangeImageshow(imageUrl);
  }
};

const changeEmployeeImage = async()=>{

  setWaitWhileUploading(true)
  try{
    const formData = new FormData();
    formData.append('photo',employeeChangeImage[0])

    const response = await fetch (`${BaseURL}/profile/update-image`,{
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
      toast.success('Image Changed Succesfully')
      setEmployeeImageChanging(false)
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
  finally{
    setWaitWhileUploading(false)
  }
}

  // For Fetching Advisor etails
  useEffect(()=>{
    const fetchEmployeeDtails = async ()=>{
      try{
        const response = await axios.get(`${BaseURL}/profile/adv`,{
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
          setAdvDetails(data.data)
        }    
        }
        else{
          console.log('Network status was not OK')
        }
      }
      catch(error){
        console.log(error)
        alert(error.message)
      }

    }

    fetchEmployeeDtails();

  },[userToken])
// console.log(employeeChangedob)
//  console.log(advDetails.dob,'heydob')

    return (
        <div className="Employee-panel-main-div">

<div className={employeeImageChanging?"ChooseEmployee-Image-div":"ChooseEmployee-Image-div-inactive"}>
      <i onClick={()=>setEmployeeImageChanging(false)} className="fa-solid fa-xmark ChooseEmployee-Image-div-close-icon"></i>
        <div className="ChooseEmployee-Image-div-sub">
        <div>
          <img className="ChooseEmployee-Image-div-sub-image" src={employeeChangeImageshow} alt="" />
        </div>
        <label htmlFor="inputImage">Choose File</label>
        <input 
        onChange={handleImageChange} 
        type="file" 
        accept="image/*"
        // capture="camera"
        style={{ display: 'none' }}
        id="inputImage"
        />
        <button onClick={changeEmployeeImage} className={employeeChangeImageshow?"ChooseEmployee-Image-div-button":"ChooseEmployee-Image-div-button-inactive"}>Upload</button>
        </div>


        <div className={waitWhileUploading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Uploading...</h4>
      </div>

      <div className={waitWhileUpdating?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Updating...</h4>
      </div>
      </div>


          <div className="Employee-panel-sub-div">
            <Link to={"/UserDashboard"}>
              <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
            </Link>
            <div className="Employee-panel-Top-Heading">
              <h1>{advDetails.first_name}</h1>
              <div className="Employee-panel-Top-Image-div">
                <img src={advDetails.photo?advDetails.photo:'https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg'} alt="" />
              </div>
                <i onClick={()=>setEmployeeImageChanging(true)} className="fa-solid fa-camera Advisor-photo-change"></i>
            </div>
    
            <hr style={{width:'90%', margin:'auto',marginTop:'8vh',marginBottom:'5vh'}} />
    
            <div className="Employee-panel-salary-section-div">
            <Link to={'/AdvisorDocumentSection'} className="Employee-panel-salary-div"><h6>Document</h6></Link>
              <Link to={'/AdvisorIncentiveSection'} className="Employee-panel-salary-div"><h6>Incentives</h6></Link>
            </div>
    
    
            {/* <hr style={{width:'90%', margin:'auto',marginTop:'8vh'}} /> */}
    
    
            <div className="Employee-panel-Personal-section-div">
            <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
            <p><span>First Name </span>{advDetails.first_name?advDetails.first_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Last Name </span>{advDetails.last_name?advDetails.last_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>D.O.B </span>{advDetails.dob?advDetails.dob:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Address </span>{advDetails.address?advDetails.address:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Phone (Personal) </span>{advDetails.phone?advDetails.phone:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>              
            </div>
    
    
    
    
            
            <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
            <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>
    
            <label htmlFor="firstName">First Name</label>
        <input  value={employeeChangeFirstName} onChange={(e)=>setEmployeeChangeFirstName(e.target.value)} type="text" name="firstName" id="firstName"/>
        <label htmlFor="LastName">Last Name</label>
        <input  value={employeeChangelastName} onChange={(e)=>setEmployeeChangelastName(e.target.value)} type="text" name="LastName" id="LastName" />
        <label style={{display:'block'}} htmlFor="DOB">D.O.B</label>
        <DatePicker
          selected={employeeChangedob}
          onChange={(date) => {
            const formattedDate = date.toLocaleDateString('en-CA');
            setEmployeeChangedob(formattedDate);
          }}
          dateFormat='dd-MM-yyyy' 
          placeholderText="Select a date"
          className="custom-date-picker-style"
          id="DOB"
        />
        <label style={{display:'block'}} htmlFor="address">Address</label>
        <textarea value={employeeChangeAddress}  onChange={(e)=>setEmployeeChangeAddress(e.target.value)} name="address" id="address" cols="30" rows="10"></textarea>
        <label htmlFor="phonePersonal">Phone (Personal)</label>
        <input value={employeeChangephone} onChange={(e)=>setEmployeeChangephone(e.target.value)} type="tel" name="phonePersonal" id="phonePersonal"/>
        <div className="Employee-panel-Personal-section-Edit-div-button">
        <button onClick={changeEmployeeData} className="Employee-panel-Personal-section-Edit-div-button-button">Save</button>
            </div>
            
            </div>
          </div>
        </div>
      );
}

export default AdvisorMainPanel