import React, { useState } from 'react'
import './UserAddUploadStyle.css'
import { Link} from 'react-router-dom'

const UserAddUpload = () => {

    const [editToolTip, setEditToolTip]= useState(false)
    const [editId, setEditId]= useState('false')


    const handleEditEnter = (id)=>{
        setEditId(id)
        setEditToolTip(true)
    }
    const handleEditLeave = ()=>{
        setEditToolTip(false)
    }
  return (
    <div className='User-Uploads-main-div'>
      <div className='User-Uploads-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
        <div  className='Uploads-Top-Heading'>
        <h1>Your Add Uploads</h1>
        </div>
        <div className='Uploads-top-head-line'></div>
        <div className="Uploads-add-content-sub">
                    <div className='Uploads-add-showing-div' >
                      <img src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                      <div className='Uploads-adds-info-div'>
                        <h5>2018 Hyundai Grand i10 maste</h5>
                        <h6>XUV Ultra</h6>
                        <div className='Uploads-adds-info-div-sub'>
                          <p>INR 50,000</p>
                          <div className='Uploads-share-icon-div'>
                          <div className={editToolTip&&editId===1?'Edit-tooltip':'Edit-tooltip-inactive'}>Edit option not available now</div>
                          <i 
                          onMouseEnter={()=>handleEditEnter(1)}
                          onMouseLeave={handleEditLeave}
                          class="fa-solid fa-pen-to-square Uploads-share-icon"></i>
                          </div>
                          <div className='Uploads-Enquiry-icon-div'>
                          <p>valid till</p>
                          <p className='Uploads-enquiry-quantity'>24 Jan</p>
                          </div>
                          <button>Remove</button>
                        </div>
                      </div>

                    </div>
                    <div className='Uploads-add-showing-div' >
                      <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                      <div className='Uploads-adds-info-div'>
                        <h5>2019 Ferrari x32 i10 maste</h5>
                        <h6>XUV Ultra</h6>
                        <div className='Uploads-adds-info-div-sub'>
                          <p>INR 1,50,000</p>
                          <div className='Uploads-share-icon-div'>
                          <div className={editToolTip&&editId===2?'Edit-tooltip':'Edit-tooltip-inactive'}>Edit option not available now</div>
                          <i
                          onMouseEnter={()=>handleEditEnter(2)}
                          onMouseLeave={handleEditLeave}
                           class="fa-solid fa-pen-to-square Uploads-share-icon" ></i>
                          </div>
                          <div className='Uploads-Enquiry-icon-div'>
                          <p>valid till</p>
                          <p className='Uploads-enquiry-quantity'>14 Jan</p>
                          </div>
                          <button>Remove</button>
                        </div>
                      </div>

                    </div>
                </div>
      </div>
    </div>
  )
}

export default UserAddUpload