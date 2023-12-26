// import React, { useEffect, useState } from 'react'
import React, {useState } from 'react'
import './UserPanelStyle.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { isUserLoggedin } from '../../Reduxs/action';

const UserMainPanel = () => {

  const UserNavigate = useNavigate()
  const UserDispatch =useDispatch()


  const [isUserLoggedIn, setIsUserLoggedIn]=useState(false);

  const [loginSignup, setLoginSignup]=useState(true);
  const [loginUserName, setLoginUserName]=useState('');
  const [loginPassword, setLoginPassword]=useState('');
  const [signinPhonenumber, setSigninPhonenumber]=useState('');
  const [signinUserName, setSigninUserName]=useState('');
  const [signinPassword, setSigninPassword]=useState('');

const toggleLogin = ()=>{
  setLoginSignup(true)
}
const toggleSignup = ()=>{
  setLoginSignup(false)
}
const handleLogin = ()=>{
  if(loginUserName==="U"&&loginPassword==="P"){
    setLoginUserName('')
    setLoginPassword('')
    setIsUserLoggedIn(true)
    toast.success('Logged In Successfully')
    UserNavigate("/UserDashboard")
    UserDispatch(isUserLoggedin(1))
  }
  else{
    toast.error('Wrong UserName or Password')
  }
}
const handleSignup = ()=>{
  if(setSigninPhonenumber!==""&&signinUserName !=="" && signinPassword !==""){
    setLoginUserName('')
    setLoginPassword('')
    toast.success('Signed Up Successfully')
  }
  else{
    toast.error('Please Fill Valid Data')
  }
}



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