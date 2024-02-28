import React, { useEffect, useState } from 'react'
import './UserProfileStyle.css'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { isUserLoggedin } from '../../../Reduxs/action'
import BaseURL from '../../../apiconfig';
import axios from 'axios';

const UserProfileView = () => {

  const UserProfileDispatch = useDispatch()
  //  const UserProfileNavigate = useNavigate()

  const Loggedinuser = localStorage.getItem('car-relation-user-name')
  const LoggedinuserAffiliation = localStorage.getItem('car-relation-user-AffId')
  const userToken = localStorage.getItem('car-relation-user-token')
  // const userEmail = localStorage.getItem('car-relation-user-email')
  // const userAadhaar = localStorage.getItem('car-relation-user-aadhaar')
  const LoggedinuserName = JSON.stringify(Loggedinuser)
  const [waitWhileLoggingOut, setWaitWhileLoggingOut] = useState(false)

    const [userEmail, setUserEmail]= useState()
    const [userAadhaar, setUserAadhaar]= useState()
    const [userProfilePhoto, setUserProfilePhoto]= useState()
    const [passwordChange,setPasswordChnage]=useState(false)
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [newEmail,setNewEmail]=useState("")
    const [newAdharNumber,setNewAdharNumber]=useState("")
    const [adharVerify,setAdharVerify]=useState(false)
    const [emailVerify,setEmailVerify]=useState(false)

    const [employeeChangeImage, setEmployeeChangeImage]= useState()
    const [employeeChangeImageshow, setEmployeeChangeImageshow]= useState()
    const [employeeImageChanging, setEmployeeImageChanging]= useState(false)
    const [waitWhileUploading, setWaitWhileUploading] = useState(false);

  



  const handleLogOut = ()=>{
    const userConfirmation = window.confirm(
      "Are you sure you want to Logout?"
    );
    if(userConfirmation){
      setWaitWhileLoggingOut(true)
    localStorage.removeItem('car-relation-user-token')
    localStorage.removeItem('car-relation-user-AffId')
    localStorage.removeItem('car-relation-user-name')
    localStorage.removeItem('car-relation-user-email')
    localStorage.removeItem('car-relation-user-aadhaar')
    localStorage.removeItem('car-relation-user-personal-Id')
    localStorage.removeItem('car-relation-user-get-role')

    setTimeout(()=>{
      UserProfileDispatch(isUserLoggedin(0))
    toast.success("Logged Out Successfully")
    window.location.assign('/')

    },1500)
    
    }

  }



  const handleAdharOption = async()=>{
    if(newAdharNumber.length>=12){
      try {
        const formData = new FormData();
        formData.append("aadhaar", newAdharNumber);
        const response = await fetch(`${BaseURL}/profile/update-aadhaar`, {
          method: "POST",
          headers: {
            Accept:'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body:formData,
        });
  
        const AdharChangeData = await response.json();
  
        if (response.ok) {
          // password changed succesfuly
          setUserAadhaar(AdharChangeData.data.aadhaar)
          localStorage.setItem('car-relation-user-aadhaar', AdharChangeData.data.aadhaar)
          toast.success(AdharChangeData.message);
          // console.log(AdharChangeData);
          setAdharVerify(false)
          setNewAdharNumber("")
          
        } else {
          // bookmark failed
          toast.error(AdharChangeData.message);
          // console.log(AdharChangeData);
          setAdharVerify(false)
          setNewAdharNumber("")
        }
      } catch (error) {
        // console.error("Error during Subbmision:", error);
        toast.error("An error occurred during Submission.");
      }
    }
    else{
      toast.error("Enter Valid Aadhar Number")
    }
  }


  const handleEmailOption =async ()=>{
    if(newEmail.length>5){
    try {
      const formData = new FormData();
      formData.append("email", newEmail);
      const response = await fetch(`${BaseURL}/profile/update-email`, {
        method: "POST",
        headers: {
          Accept:'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body:formData,
      });

      const EmalChangeData = await response.json();

      if (response.ok) {
        // password changed succesfuly
        setUserEmail(EmalChangeData.data.email)
        localStorage.setItem('car-relation-user-email', EmalChangeData.data.email)
        toast.success(EmalChangeData.message);
        // console.log(EmalChangeData);
        setEmailVerify(false)
        setNewEmail("")
        
      } else {
        // bookmark failed
        toast.error(EmalChangeData.message);
        // console.log(EmalChangeData);
        setEmailVerify(false)
        setNewEmail("")
      }
    } catch (error) {
      // console.error("Error during Subbmision:", error);
      toast.error("An error occurred during Submission.");
    }
  }
  else{
    toast.error("Enter Valid Email Address")
  }
  }



  const handlePasswordChangeOption = ()=>{
    setPasswordChnage(false)
    toast.success('Password Change service will be available soon')
  }


  const handleChangePassword =async()=>{

    if(newPassword.length>8){
      try {
        const formData = new FormData();
        formData.append("old_password", oldPassword);
        formData.append("password", newPassword);
        const response = await fetch(`${BaseURL}/profile/update-password`, {
          method: "POST",
          headers: {
            Accept:'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body:formData,
        });
  
        const PasswordChangeData = await response.json();
  
        if (response.ok) {
          // password changed succesfuly
          toast.success(PasswordChangeData.message);
          // console.log(PasswordChangeData);
          setPasswordChnage(false)
          setOldPassword("")
          setNewPassword("")
          
        } else {
          // bookmark failed
          toast.error(PasswordChangeData.message);
          // console.log(PasswordChangeData);
          setPasswordChnage(false)
          setOldPassword("")
          setNewPassword("")
        }
      } catch (error) {
        // console.error("Error during Subbmision:", error);
        toast.error("An error occurred during Submission.");
      }
    }
    else{
      toast.error("Password should be atleast of 8 charecters")
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

  // Fetch User Email, AAdhar etc
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/getuserinfo`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            Authorization:`Bearer ${userToken}`
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if (data) {
            // console.log(data.data)
            localStorage.setItem('car-relation-user-email', data.data.email)
            localStorage.setItem('car-relation-user-aadhaar', data.data.aadhaar)
            setUserProfilePhoto(data.data.photo)
            setUserEmail(data.data.email)
            setUserAadhaar(data.data.aadhaar)
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message)
      }
    };

    fetchData();
  },[userToken]);




  return (
    <div className='Profile-View-Main-div'>
      {/* =========Logging Out Add Wait Div ========= */}
      <div className={waitWhileLoggingOut?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
          <h4>Logging Out...</h4>
      </div>
      {/* ================= */}

      {/* =========== */}
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
      </div>

      <div className={waitWhileUploading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Uploading...</h4>
      </div>
      {/* =================== */}



        <div className='Profile-View-Sub-div'>
        <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>    
            <div className='Profile-View-top-secton'>
                <div className='User-profile-image'>
                    <img src={userProfilePhoto?userProfilePhoto:"https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg"} alt="" />
                    {/* <i  className="fa-solid fa-camera Profile-photo-change"></i> */}
                </div>
                    <i onClick={()=>setEmployeeImageChanging(true)} className="fa-solid fa-camera Profile-photo-change"></i>

                <div className='User-profile-name'>
                    <h4>{LoggedinuserName}</h4>
                </div>
               
            </div>
             <div className='profile-line-down'>

             </div>
             <div className="Profile-User-Details">
                <p><span>Email </span>{userEmail?userEmail:'@gmail.com'}<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} onClick={()=>setEmailVerify(!emailVerify)} className='profile-input-optional'>{emailVerify?'  close':'update'}</b></p>
                <div className={emailVerify?'User-Email-input-div-active':'User-Email-input-div-inactive'}>
                <input onChange={(e)=>setNewEmail(e.target.value)} value={newEmail} className='User-Email-input' type="text" placeholder='Enter Email address' />
                <button onClick={handleEmailOption} className='bg-info'>submit</button>
                </div>
                <p><span>Mobile </span> **********</p>
                <p><span>Affiliation </span>{LoggedinuserAffiliation}</p>
                <p><span>Level </span> Primary</p>
                <p><span>Adhar </span>{userAadhaar?userAadhaar:'Not Verifed'} <b onClick={()=>setAdharVerify(!adharVerify)} className='profile-input-optional'>{userAadhaar?'':'verify'}</b></p>
                <div className={adharVerify?'User-Adhar-input-div-active':'User-Adhar-input-div-inactive'}>
                <input onChange={(e)=>setNewAdharNumber(e.target.value)} value={newAdharNumber} className='User-Adhar-input' type="text" placeholder='Enter Adhar Number' />
                <button onClick={handleAdharOption} className='bg-info'>submit</button>
                </div>
                <p><span>Password </span> ******** <b onClick={()=>setPasswordChnage(!passwordChange)} className='profile-input-optional'>{passwordChange?'^':'Change Password'}</b></p>

                <div className={passwordChange?'change-user-password-inputs-active':'change-user-password-inputs-inactive'}>
                    <input onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword} type="text" placeholder='Enter old Pasword' />
                    <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="text" placeholder='Enter New Pasword' />
                    <br />
                    <button onClick={handleChangePassword}>Save</button>
                    <button onClick={handlePasswordChangeOption}>Don't Save</button>

                </div>
                <div onClick={handleLogOut} className='Profile-user-Logout-div'>
               <i className="fa-solid fa-power-off"></i>
                <h6>LogOut</h6>
                </div>
             </div>
        </div>
    </div>
  )
}

export default UserProfileView