import React, { useState } from 'react'
import './UpperNavStyle.css'
import PendingDatas from './PendingAddData'
import { useDispatch, useSelector } from 'react-redux'
import { addThisPendingDetails } from '../../Reduxs/action'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpperNavbar = () => {

  const PendingDispatch = useDispatch()
  const getExtendedPendingDetails = useSelector((state) => state.PendingDetailsAdder)

  const PendingAddData = PendingDatas;

  const [adminLogin, setAdminLogin] = useState(false)
  const [adminDashboardShow, setAdminDashboardShow] = useState(false)
  const [adminLoginId, setAdminLoginId] = useState('')
  const [adminLoginpassword, setAdminLoginpassword] = useState('')

  const [showAddDetails, setShowAddDetails] = useState(true)

  const AdminCheck = () => {

    if (adminLoginId === "Siddhi" && adminLoginpassword === "Siddhi@123") {
      setAdminDashboardShow(true)
      setAdminLogin(false)
    }
    else {
      alert("Wrong Credentials")
    }
  }

  const handlePendingDetails = (img, title) => {
    setShowAddDetails(false)
    PendingDispatch(addThisPendingDetails(img, title))
  }
  const handlePendingApproval = () => {
    setShowAddDetails(true)
    toast.success('Add Published', {
      position: 'top-left',
      autoClose: 3000,
    });
  }
  const handlePendingReject = () => {
    setShowAddDetails(true)
    toast.error('Add Rejected', {
      position: 'top-left',
      autoClose: 3000,
    });
  }

  return (
    <div className='Up-Navbar-Main-div'>
      <div className='Up-Navbar-Sub-div'>
        <div className="Up-Nav-left-div">
          <i className="fa-solid fa-phone"></i>
          <p>1-800-458-56789</p>
          <i className="fa-solid fa-book"></i>
          <p>23 Bakery Street, London, UK</p>
          <i className="fa-regular fa-clock"></i>
          <p>Mon - Fri 8:00 - 18:00</p>
        </div>
        <div className="Up-Nav-right-div">
          <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.google.com/"><i className="fa-brands fa-twitter"></i></a>

          <h6 onClick={() => setAdminLogin(true)}>Admin</h6>
        </div>
      </div>
      <hr style={{ marginTop: '-0.2vh' }} />

      {/* ------Admin Login Section------ */}
      <div className={adminLogin ? 'Admin-Login-show' : 'Admin-Login-hide'}>
        <div className='Admin-login-sub-div'>
          <i onClick={() => setAdminLogin(false)} className="fa-solid fa-x"></i>
          <h1>Admin Login</h1>
          <input value={adminLoginId} onChange={(e) => setAdminLoginId(e.target.value)} type="text" placeholder='User Id' />
          <input value={adminLoginpassword} onChange={(e) => setAdminLoginpassword(e.target.value)} type="text" placeholder='Password' />
          <button onClick={AdminCheck}>Login</button>
        </div>
      </div>

      {/* ------Admin DashBoard Section------ */}
      <div className={adminDashboardShow ? 'Admin-Dashboard-show' : 'Admin-Dashboard-hide'}>
        <i onClick={() => setAdminDashboardShow(false)} className="fa-solid fa-x Admin-Dashboard-close"></i>
        <h3>Welcome Admin</h3>
        <div className='Admin-dashboard-sub-div'>
          <div className='Pending-Add-Section'>
            <div className='Pending-add-heading'>
              Pending Adds
            </div>
            <div className='Pending-Adds-Content-section'>
              {showAddDetails ?
                <div className="Pending-add-content-sub">
                  {PendingAddData.map((items) => (
                    <div className='Pending-add-showing-div' key={items.id}>
                      <img src={items.src} alt="" />
                      <div className='Pending-adds-info-div'><h5>{items.title}</h5>
                        <div className='Pending-adds-info-div-sub'>
                          <p>INR {items.cost}</p>
                          <button className='btn border' onClick={() => handlePendingDetails(items.src, items.title)}> View Details</button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
                :
                <div className='Pending-add-content-sub'>
                  <div className='Pending-add-showing-div-Extended'>
                    <i onClick={() => setShowAddDetails(true)} className="fa-solid fa-x Pending-Add-Extended-close"></i>
                    <img src={getExtendedPendingDetails.src} alt="" />
                    <div className='Pending-images-extended'>
                      <img src={getExtendedPendingDetails.src} alt="" />
                      <img src={getExtendedPendingDetails.src} alt="" />
                      <img src={getExtendedPendingDetails.src} alt="" />
                      <img src={getExtendedPendingDetails.src} alt="" />
                      <img src={getExtendedPendingDetails.src} alt="" />

                    </div>
                    <h5 className='Pending-Extended-car-details border'><span>Company:</span> Toyota</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Model:</span> XUV</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Mfg Year:</span> 2019</h5>
                    <h5 className='Pending-Extended-car-details border'><span>KM Driven:</span> 30,000</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Description:</span> Toyota is a globally renowned automotive manufacturer with a rich history and a diverse range of vehicles. Founded in 1937 by Kiichiro Toyoda, the company has grown to become one of the largest and most influential automakers in the world. Toyota's commitment to innovation, reliability, and sustainability has played a significant role in shaping the automotive industry.</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Owner Sr:</span> 2</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Sale Value:</span> 5,60,000</h5>
                    <h5 className='Pending-Extended-car-details border'><span>Insurance:</span> Yes</h5>
                    <div className='Add-Approve-Reject-button-div'>
                      <button onClick={handlePendingApproval} className='btn btn-success'>Approve Add</button>
                      <button onClick={handlePendingReject} className='btn btn-danger'>Reject Add</button>
                    </div>

                  </div>
                </div>
              }
            </div>

          </div>
          <div className="Admin-Control-Center">
            <div className='Control-Centre-Heading'>
              Control Center
            </div>
            <div className='Admin-Controls-content'>
              <div className='Admin-content-settings border'>
              <i class="fa-solid fa-gear"></i>
              <h1>Settings</h1>

              </div>
              <div className='Admin-content-settings border'>
              <i class="fa-solid fa-user"></i>
              <h1>Profile</h1>

              </div>
              <div className='Admin-content-settings border'>
              <i class="fa-solid fa-location-arrow"></i>
              <h1>Location</h1>
              

              </div>

            </div>

          </div>
          <div className="Misleneous-control-center">
            <div className="Misleneous-heading">
              Misleneous
            </div>
            <div className="Misleneous-control-Content">
            <div className='Misleneous-details border'>
            <i class="fa-solid fa-spinner"></i>
              <h2>Enquiries</h2>
              </div>
            <div className='Misleneous-details border'>
            <i class="fa-brands fa-themeisle"></i>
              <h2>Themes</h2>
              </div>
            <div className='Misleneous-details border'>
            <i class="fa-solid fa-language"></i>
              <h2>Language</h2>
              </div>
            <div className='Misleneous-details border'>
            <i class="fa-solid fa-power-off"></i>
              <h2>Log Out</h2>
              </div>

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default UpperNavbar