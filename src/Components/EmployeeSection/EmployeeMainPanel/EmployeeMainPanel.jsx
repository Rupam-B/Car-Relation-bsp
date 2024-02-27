import React, { useEffect, useState } from "react";
import "./EmployeeMainPanelStyle.css";
import { Link } from "react-router-dom";
import { Geolocation } from "@capacitor/geolocation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseURL from "../../../apiconfig";
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { parse, format } from 'date-fns';

const EmployeeMainPanel = () => {

  const userToken = localStorage.getItem("car-relation-user-token");
    const [resizingAttButton, setResizingAttButton]= useState(false)
    const [shouldBlink, setShouldBlink]= useState(true)
    const [isPersonalEdit, setIsPersonalEdit]= useState(false)


    const [employeeDetails, setEmployeeDetails]= useState([])


    // change Details section
    const [employeeChangeFirstName, setEmployeeChangeFirstName]= useState()
    const [employeeChangelastName, setEmployeeChangelastName]= useState()
    const [employeeChangefatherName, setEmployeeChangefatherName]= useState()
    const [employeeChangedob, setEmployeeChangedob]= useState()
    const [employeeChangephone, setEmployeeChangephone]= useState()
    const [employeeChangephoneHome, setEmployeeChangephoneHome]= useState()
    const [employeeChangeAddress, setEmployeeChangeAddress]= useState()
    const [employeeChangeImage, setEmployeeChangeImage]= useState()
    const [employeeChangeImageshow, setEmployeeChangeImageshow]= useState()
    const [employeeImageChanging, setEmployeeImageChanging]= useState(false)

    const [waitWhileUploading, setWaitWhileUploading] = useState(false);
    const [waitWhileUpdating, setWaitWhileUpdating] = useState(false);

    // console.log(formattedsubmitDate)




    const submitAttendance = async () => {
      try {
          const position = await Geolocation.getCurrentPosition();
          const { latitude, longitude } = position.coords;
          const timestamp = new Date().toISOString();

          const date = new Date(timestamp);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

          console.log('Location:', { latitude, longitude, formattedDate, formattedTime });
          setShouldBlink(false)
          toast.success(`Attendance Succesfull on ${formattedDate} time : ${formattedTime}`)

          // setAttendanceDetails({
          //     latitude,
          //     longitude,
          //     date: formattedDate,
          //     time: formattedTime,
          // });
      } catch (error) {
          console.error('Error getting location:', error);
          toast.error('Attendance Submission Failed')
      }
  };

  const handleEditInfo =()=>{
    setIsPersonalEdit(true)

    setEmployeeChangeFirstName(employeeDetails.first_name)
    setEmployeeChangelastName(employeeDetails.last_name)
    setEmployeeChangefatherName(employeeDetails.father_name)

// ---------
    const parsedsubmitDate = parse(employeeDetails.dob, 'dd-MM-yyyy', new Date());
    const formattedsubmitDate = format(parsedsubmitDate, 'yyyy-MM-dd');

    // -----------
    setEmployeeChangedob(formattedsubmitDate)
    setEmployeeChangeAddress(employeeDetails.address)
    setEmployeeChangephone(employeeDetails.phone)
    setEmployeeChangephoneHome(employeeDetails.phone_home)

    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: 'smooth',
      });
    }, 100);
  }


  // const ImageSettingFunc = (e)=>{
  //   setEmployeeImageChanging(false)
  //   setEmployeeChangeImage(e.target.value)
  // }
  const handleImageChange = (event) => {
    const files = event.target.files;
    
    if (files.length > 1) {
      
      alert("You can only upload up to 1 images.");
      return;
    } else {
      setEmployeeChangeImage(files)
        const imageUrl = URL.createObjectURL(files[0]);
      setEmployeeChangeImageshow(imageUrl);
    }
  };
  



    useEffect(()=>{
      if(shouldBlink){
        setTimeout(()=>{
          setResizingAttButton(!resizingAttButton)
      },1000)
      }   
    },[resizingAttButton,shouldBlink])

// For Employee Doc Change
const changeEmployeeData = async()=>{
  setWaitWhileUpdating(true)
  try{
    const formData = new FormData();
    formData.append('first_name',employeeChangeFirstName)
    formData.append('last_name',employeeChangelastName)
    formData.append('father_name',employeeChangefatherName)
    formData.append('phone',employeeChangephone)
    formData.append('phone_home',employeeChangephoneHome)
    formData.append('dob',employeeChangedob)
    formData.append('address',employeeChangeAddress)

    const response = await fetch (`${BaseURL}/profile/emp-update`,{
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

// For Employee Photo Change
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

// For Fetching Employee etails
  useEffect(()=>{
    const fetchEmployeeDtails = async ()=>{
      try{
        const response = await axios.get(`${BaseURL}/profile/emp`,{
          mode:'no-cors',
          headers:{
              Accept:'application/json',
              Authorization: `Bearer ${userToken}`,
          }
        })
        if(response.status>=200&&response.status<300){
          const data = response.data
        if(data){
          console.log(data)
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
  // console.log(employeeDetails.dob)
  // console.log(employeeChangeImage)
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
        capture="camera"
        style={{ display: 'none' }}
        id="inputImage"
        />
        <button onClick={changeEmployeeImage} className={employeeChangeImageshow?"ChooseEmployee-Image-div-button":"ChooseEmployee-Image-div-button-inactive"}>Upload</button>
        </div>
      </div>

      <div className={waitWhileUploading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Uploading...</h4>
      </div>
      <div className={waitWhileUpdating?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Updating...</h4>
      </div>

      
      <div className="Employee-panel-sub-div">
        <Link to={"/UserDashboard"}>
          <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
        </Link>
        <div className="Employee-panel-Top-Heading">
          <h1>{employeeDetails.first_name}</h1>
          <div className="Employee-panel-Top-Image-div">
            <img src={employeeDetails.photo?employeeDetails.photo:'https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg'} alt="" />
          </div>
          <i onClick={()=>setEmployeeImageChanging(true)} className="fa-solid fa-camera Employee-photo-change"></i>
        </div>
        <div className="Employee-panel-attendance-button-div">
        <button
          disabled={!shouldBlink}
          onClick={submitAttendance}
          className={shouldBlink? resizingAttButton? 'Employee-panel-attendance-button-small': 'Employee-panel-attendance-button-large'
          : 'Employee-panel-attendance-button-deactive'}
>
  <i className={shouldBlink?"fa-regular fa-hand-pointer fa-hand-pointer-active":'fa-regular fa-hand-pointer fa-hand-pointer-inactive'}></i>
</button>
          <p>click to submit attendance</p>
        </div>

        <hr style={{width:'90%', margin:'auto'}} />

        <div className="Employee-panel-salary-section-div">
        <Link to={'/EmployeeSalarySection'} className="Employee-panel-salary-div"><h6>Salary</h6></Link>
          <Link to={'/EmployeeAttendanceSection'} className="Employee-panel-salary-div"><h6>Attendance</h6></Link>
        </div>
        <div style={{marginBottom:'5vh'}} className="Employee-panel-salary-section-div">
        <Link to={'/EmployeeDocumentSection'} className="Employee-panel-salary-div"><h6>Documents</h6></Link>
          <Link to={'/EmployeeApplyLeaveSection'} className="Employee-panel-salary-div"><h6>Apply Leave</h6></Link>
        </div>


        <hr style={{width:'90%', margin:'auto'}} />


        <div className="Employee-panel-Personal-section-div">
        <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
        <p><span>First Name </span>{employeeDetails.first_name?employeeDetails.first_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Last Name </span>{employeeDetails.last_name?employeeDetails.last_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Father's Name </span>{employeeDetails.father_name?employeeDetails.father_name:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>D.O.B </span>{employeeDetails.dob}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Address </span>{employeeDetails.address?employeeDetails.address:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Phone (Personal) </span>{employeeDetails.phone?employeeDetails.phone:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Phone (Home) </span>{employeeDetails.phone_home?employeeDetails.phone_home:'NA'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
          
        </div>




        
        <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
        <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>

        <label htmlFor="firstName">First Name</label>
        <input  value={employeeChangeFirstName} onChange={(e)=>setEmployeeChangeFirstName(e.target.value)} type="text" name="firstName" id="firstName"/>
        <label htmlFor="LastName">Last Name</label>
        <input  value={employeeChangelastName} onChange={(e)=>setEmployeeChangelastName(e.target.value)} type="text" name="LastName" id="LastName" />
        <label htmlFor="fatherName">Father's Name</label>
        <input value={employeeChangefatherName}  onChange={(e)=>setEmployeeChangefatherName(e.target.value)} type="text" name="fatherName" id="fatherName" />
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
        <label htmlFor="phoneHome">Phone (Home)</label>
        <input  value={employeeChangephoneHome} onChange={(e)=>setEmployeeChangephoneHome(e.target.value)} type="tel" name="phoneHome" id="phoneHome"/>
        <div className="Employee-panel-Personal-section-Edit-div-button">
        <button onClick={changeEmployeeData} className="Employee-panel-Personal-section-Edit-div-button-button">Save</button>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default EmployeeMainPanel;
