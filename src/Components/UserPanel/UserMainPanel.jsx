


// import React, { useEffect, useState } from 'react'
import React, {useState } from 'react'
import './UserPanelStyle.css'
import BaseURL from '../../apiconfig'
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { isUserLoggedin } from '../../Reduxs/action';
// import axios from 'axios';

const UserMainPanel = () => {

  // const UserNavigate = useNavigate()
  const UserDispatch =useDispatch()


  const [isUserLoggedIn, setIsUserLoggedIn]=useState(false);

  const [loginSignup, setLoginSignup]=useState(true);
  const [loginUserName, setLoginUserName]=useState('');
  const [loginPassword, setLoginPassword]=useState('');
  const [signinPhonenumber, setSigninPhonenumber]=useState('');
  const [signinUserName, setSigninUserName]=useState('');
  const [signinPassword, setSigninPassword]=useState('');
  const [signinConfirmPassword, setSigninConfirmPassword]=useState('');

const toggleLogin = ()=>{
  setLoginSignup(true)
}
const toggleSignup = ()=>{
  setLoginSignup(false)
}
const handleLogin = async()=>{
  if(loginUserName!==""&&loginPassword!==""){
    try {
      const response = await fetch(`${BaseURL}/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUserName,
          password: loginPassword,
        })
      });

      const Logindata = await response.json();

      if (response.ok) {
        // Login Success
        toast.success(Logindata.message);
        console.log(Logindata)
        console.log(Logindata.data.token)
        console.log(Logindata.data.unique_id)
        localStorage.setItem('car-relation-user-token',Logindata.data.token)
        localStorage.setItem('car-relation-user-AffId',Logindata.data.unique_id)
        localStorage.setItem('car-relation-user-name',Logindata.data.name)
        

        // Navigated
        setIsUserLoggedIn(true);
        window.location.assign("/UserDashboard");
        UserDispatch(isUserLoggedin(1));
      } else {
        // Login failed
        toast.error(Logindata.message);
        console.log(Logindata);
      }

    } catch (error) {
      console.error("Error during Login:", error);
      toast.error("An error occurred during Login.");
    }
  }
  
}



const handleSignup = async () => {
  if (signinPhonenumber !== "" && signinUserName !== "" && signinPassword !== "" && signinPassword === signinConfirmPassword) {
    try {
      const response = await fetch(`${BaseURL}/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signinUserName,
          phone: signinPhonenumber,
          password: signinPassword,
          confirm_password: signinConfirmPassword,
        })
      });

      const SignUpdata = await response.json();

      if (response.ok) {
        // Registration Success
        toast.success(SignUpdata.message);
        console.log(SignUpdata)
        console.log(SignUpdata.data.token)
        console.log(SignUpdata.data.unique_id)
        localStorage.setItem('car-relation-user-token',SignUpdata.data.token)
        localStorage.setItem('car-relation-user-AffId',SignUpdata.data.unique_id)
        localStorage.setItem('car-relation-user-name',SignUpdata.data.name)
        

        // Navigated
        setIsUserLoggedIn(true);
        window.location.assign("/UserDashboard");
        UserDispatch(isUserLoggedin(1));
      } else {
        // Registration failed
        toast.error(SignUpdata.message);
        console.log(SignUpdata);
      }

    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    }
  }
};




  return (
    <div className='User-panel-main-div'>
    <div className='User-panel-sub-div'>
    <Link to={'/'}><i className="fa-solid fa-arrow-left user-panel-close-mark"></i></Link>
    { isUserLoggedIn?<button>User Dasboard</button>
    :
     <div className='User-Authentication-div'>
          <div className='Login-Signup-div'>
            <div className='Login-Signup-button-div'>
              <button onClick={toggleLogin} className={loginSignup?'Login-btn':'Login-btn-inactive'}>Log In</button>
              <button onClick={toggleSignup} className={loginSignup?'Login-btn-inactive':'Login-btn'}>Sign Up</button>             
            </div>
            <div className='Login-Signup-Content-div'>
              <div className='Login-Signup-Content-inputs-div'>
              {loginSignup?
              <div className='Login-inputs-user'>
                <input value={loginUserName} onChange={(e)=>setLoginUserName(e.target.value)} type="text" placeholder='User Name'/>
                <input value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} type="text" placeholder='Password'/>
                <button onClick={handleLogin}>Login</button>
              </div>:
              <div className='Signin-inputs-user'>
                <input value={signinPhonenumber} onChange={(e)=>setSigninPhonenumber(e.target.value)} type="text" placeholder='Mobile Number'/>
                <input value={signinUserName} onChange={(e)=>setSigninUserName(e.target.value)} type="text" placeholder='User Name'/>
                <input value={signinPassword} onChange={(e)=>setSigninPassword(e.target.value)} type="text" placeholder='Password'/>
                <input value={signinConfirmPassword} onChange={(e)=>setSigninConfirmPassword(e.target.value)} type="text" placeholder='Confirm Password'/>
                <button onClick={handleSignup}>Sign Up</button>
              </div>
              }

              </div>

            </div>

          </div>
        

        </div>
    }

    </div>
    </div>
  )
}

export default UserMainPanel