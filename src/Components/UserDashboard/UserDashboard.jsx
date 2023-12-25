import React from 'react'
import './UserDashboardStyle.css'
import { Link, useNavigate} from 'react-router-dom'
import { isUserLoggedin } from '../../Reduxs/action'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserDashboard = () => {

  const UserDashDispatch = useDispatch()
  const UserDashNavigate = useNavigate()



  const handleLogOut = ()=>{
    UserDashDispatch(isUserLoggedin(0))
    toast.success("Logged Out Successfully")
    UserDashNavigate('/')

  }
  return (
    <div className='User-Dashboard-main-div'>
    <div className='User-Dashboard-sub-div'>
      <div className='User-Dashboard-header-div'>
      <img src={process.env.PUBLIC_URL + '/NEW-LOGO2.png'} alt="" />
        {/* <h1>Welcome User</h1> */}
        <Link to={'/'}><i className="fa-solid fa-arrow-left user-dashboard-close-mark"></i></Link>
      </div>
      <hr />

      <div className='User-Dashboard-options-div'>
        <div className='row my-2 grid-row'>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
          <i style={{color:'#004b79'}} className="fa-solid fa-id-card-clip "></i>
          <p>Profile</p>
            </div>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#44355b'}} className="fa-solid fa-cannabis"></i>
          <p>Referrals</p>
            </div>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#76daff'}} className="fa-solid fa-gift"></i>
          <p>Rewards</p>
            </div>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#4dc47d'}} className="fa-regular fa-money-bill-1"></i>
          <p>Earnings</p>
            </div>
          </div>
          
        </div>
        <div className='row my-2 grid-row'>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#520099'}} className="fa-brands fa-affiliatetheme"></i>
          <p>Affliation</p>
            </div>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#955214'}} className="fa-solid fa-upload"></i>
          <p>Uploads</p>
            </div>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'#264f36'}} className="fa-solid fa-crown"></i>
          <p>Roaylity</p>
            </div>
          </div>
          <div onClick={handleLogOut} className='col-md-3 col-sm-3 user-options-details'>
            <div className='user-options-details-inner-div'>
            <i style={{color:'red'}} className="fa-solid fa-power-off"></i>
          <p>LogOut</p>
            </div>
          </div>
          
        </div>
      </div>
      <hr />
      <div className='User-Dashboard-carousel-div my-3'>
  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active" data-bs-interval="2000">
        <img  src="https://img.freepik.com/premium-vector/people-share-info-about-referral-earn-money-landing-page-template_95505-155.jpg" className="d-block w-100 h-100"  alt="..."/>
      </div>
      <div className="carousel-item" >
        <img  src="https://www.proideators.com/wp-content/uploads/2022/09/ProiDeators-Media-Referal-Program-Refer-and-Earn-Money.jpg" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://png.pngtree.com/template/20220407/ourmid/pngtree-refer-a-friend-flat-design-illustration-with-megaphone-on-screen-mobile-image_963487.jpg" className="d-block w-100" alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
 
</div>

      

        
    </div>
    </div>
  )
}
