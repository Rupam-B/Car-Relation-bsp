import React from 'react'
import './UserDashboardStyle.css'
import { Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

export const UserDashboard = () => {
  const whichRole =localStorage.getItem('car-relation-user-get-role')

  
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
        <div  className='row my-2 grid-row'>
     <div className='col-md-3 col-sm-3 user-options-details'>
        <Link to={'/UserDashboardProfile'} style={{backgroundColor:'#00387b',border:'none'}} className='user-options-details-inner-div'> <div  >
          {/* <i style={{color:'white'}} className="fa-solid fa-id-card-clip "></i> */}
          <i style={{color:'white'}} className="fa-regular fa-user"></i>
            </div>
            </Link>
          <p>Profile</p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={'/UserDashboardReferral'} style={{backgroundColor:'#00387b',border:'none'}} className='user-options-details-inner-div'>
            <div >
            {/* <i style={{color:'#44355b'}} className="fa-solid fa-cannabis"></i> */}
            <i style={{color:'white'}} className="fa-solid fa-share"></i>
            </div>
            </Link>
          <p>Referrals</p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={ whichRole==='Employee'?'/EmployeeMainPanel':whichRole==='Advisor'?'/AdvisorMainPanel':'/ServiceNotAvailable'} style={{backgroundColor:'#00387b',border:'none'}} className='user-options-details-inner-div'>
            {/* <Link to={'/EmployeeMainPanel'} style={{backgroundColor:'#00387b',border:'none'}} className='user-options-details-inner-div'> */}
            <div>
            <i style={{color:'white'}} className="fa-regular fa-circle-user"></i>
            </div>
            </Link>
          {/* <p>Employee</p> */}
          <p>{ whichRole==='Employee'?'Employee':whichRole==='Advisor'?'Advisor':'Adv/Emp'} </p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={'/UserAffiliation'} style={{backgroundColor:'#00387b',border:'none'}} className='user-options-details-inner-div'>
            <div >
            {/* <i style={{color:'#4dc47d'}} className="fa-regular fa-money-bill-1"></i> */}
            <i style={{color:'white'}} className="fa-solid fa-file-import"></i>
            </div>
            </Link>
          <p>Affiliation</p>
          </div>
          
        </div>
        <div className='row my-2 grid-row'>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={'/UserFavouritePage'} className='user-options-details-inner-div'>
            <div>
            <i style={{color:'#ff0000'}} className="fa-solid fa-heart"></i>
            </div>
            </Link>
          <p>Favourites</p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={'/UserCarList'} className='user-options-details-inner-div'>
            <div >
            <i style={{color:'#955214'}} className="fa-solid fa-upload"></i>
            </div>
            </Link>
          <p>Uploads</p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
            <Link to={'/UserBookMarkPage'} className='user-options-details-inner-div'>
            <div >
            <i style={{color:'#264f36'}} className="fa-regular fa-bookmark"></i>
            </div>
            </Link>
          <p>Bookmarks</p>
          </div>
          <div className='col-md-3 col-sm-3 user-options-details'>
          <Link to={'/SellCarPortal'} className='user-options-details-inner-div'> <div>
            <i style={{fontSize:'1.5rem',color:'brown'}} className="fa-brands fa-sellcast"></i>
            </div>
          </Link>
          <p>Sell</p>
          </div>
          
        </div>
      </div>
      <hr />
      <div className='User-Dashboard-carousel-div my-5'>
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