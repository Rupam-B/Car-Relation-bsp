import React from 'react'
import './UserReferalsStyle.css'
import { Link} from 'react-router-dom'

const UserReferals = () => {
  return (
    <div className='User-Referrals-main-div'>
      <div className='User-Referrals-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
        <div  className='Referal-Top-Heading'>
        <h1>Your Referrals</h1>
        </div>
        <div className='Referal-top-head-line'></div>
        <div className="Referal-add-content-sub">
                    <div className='Referal-add-showing-div' >
                      <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                      <div className='Referal-adds-info-div'>
                        <h6>2018 Hyundai Grand i10 maste</h6>
                        <h6>XUV Ultra</h6>
                        <div className='Referal-adds-info-div-sub'>
                          <p>INR 50,000</p>
                          <div className='refral-share-icon-div'>
                          <i className="fa-solid fa-share refral-share-icon"></i>
                          <p className='refral-share-quantity'>6</p>
                          </div>
                          <div className='refral-Enquiry-icon-div'>
                          <i style={{color:'green'}} className="fa-solid fa-eye"></i>
                          <p className='refral-enquiry-quantity'>4</p>
                          </div>
                          <button>Delete</button>
                        </div>
                      </div>

                    </div>
                    <div className='Referal-add-showing-div' >
                      <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                      <div className='Referal-adds-info-div'>
                        <h6>2019 Ferrari x32 i10 maste</h6>
                        <h6>XUV Ultra</h6>
                        <div className='Referal-adds-info-div-sub'>
                          <p>INR 1,50,000</p>
                          <div className='refral-share-icon-div'>
                          <i className="fa-solid fa-share refral-share-icon"></i>
                          <p className='refral-share-quantity'>8</p>
                          </div>
                          <div className='refral-Enquiry-icon-div'>
                          <i style={{color:'green'}} className="fa-solid fa-eye"></i>
                          <p className='refral-enquiry-quantity'>3</p>
                          </div>
                          <button>Delete</button>
                        </div>
                      </div>

                    </div>
                </div>
      </div>
    </div>
  )
}

export default UserReferals