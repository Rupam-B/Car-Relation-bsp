import React, { useState } from 'react'
import './HomeStyle.css'
import carMainData from './carUrls'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addThisImage } from "../../Reduxs/action";


const Home = () => {
  const HomeDispatch = useDispatch()
  const [buttonActive,setButtonActive] = useState(false)
  const [favouriteactive,setFavouriteactive] = useState(false)
  const [favouriteid,setFavouriteId] = useState('')
  const [bookmarkactive,setBookmarkactive] = useState(false)
  const [bookmarkid,setBookmarkId] = useState('')
  
  const [phoneToolTip,setPhonneToolTip] = useState(false)
  const [whatsappToolTip,setWhatsappToolTip] = useState(false)
  const [enquiryToolTip,setEnquiryToolTip] = useState(false)
  const [viewToolTip,setViewToolTip] = useState(false)
  const [phoneId,setPhonneId] = useState("")


  const handleFavouriteActive =(favid)=>{
    setFavouriteactive(!favouriteactive)
    setFavouriteId(favid)
  }
  const handleBookmarkActive =(favid)=>{
    setBookmarkactive(!bookmarkactive)
    setBookmarkId(favid)
  }
  const handlePhoneTooltip =(toolid)=>{
    setPhonneToolTip(true)
    setPhonneId(toolid)
  }
  const handleWhatsappTooltip =(toolid)=>{
    setWhatsappToolTip(true)
    setPhonneId(toolid)
  }
  const handleEnquiryTooltip =(toolid)=>{
    setEnquiryToolTip(true)
    setPhonneId(toolid)
  }
  const handleViewTooltip =(toolid)=>{
    setViewToolTip(true)
    setPhonneId(toolid)
  }

  const carReqData = carMainData.carMainData
  return (
    <div className="Home-Main-div">
      <div className="Home-sub-div">
        <div className="Home-Listing-Header">
          <h1>Car-Listing</h1>
          <div className='buy-sell-btn'>
            <Link onClick={()=>setButtonActive(false)} to={'/SellCarPortal'} className={buttonActive?'buy-sell-btn-one':'buy-sell-btn-one-inactive'}>Sell</Link>
            <Link onClick={()=>setButtonActive(true)} to={'/'} className={buttonActive?'buy-sell-btn-two':'buy-sell-btn-two-active'}>Buy</Link>
          </div>
        </div>
        <div className="Home-middle-content">
          {carReqData.map((items)=>(
          <div key={items.id} className="card card-width-18">

           <Link onClick={()=>HomeDispatch(addThisImage(items.src))} to={'/DisplayCarDetails'}><img src={items.src} className="card-img-top" alt=""/></Link>
            <div className="card-body home-card-body">
              <div className='car-home-main-title-div'>
              <h6 className="card-title car-home-main-title">{items.title.length>23?`${items.title.slice(0,23)}...`:items.title}</h6>
              <i onClick={()=>handleBookmarkActive(items.id)}
               className=
                {bookmarkactive&&bookmarkid===items.id?"fa-regular fa-bookmark bookmark-icon-active":'fa-regular fa-bookmark bookmark-icon-inactive'}>
               </i>
              </div>
              <i onClick={()=>handleFavouriteActive(items.id)}
              className={favouriteactive&&favouriteid===items.id?"fa-solid fa-heart favourites-icon-active":'fa-solid fa-heart favourites-icon-inactive'}></i>
              {/* <p className='Date-icon'>9 Dec</p> */}
              <p className="card-text">
              {items.model.length>20?`${items.model.slice(0,20)}...`:items.model}
              <div className='car-cost-heading-div'>
              <h5 className='car-cost-heading5'>₹{items.cost}</h5>
              <p>{items.kilometres}kms</p>
              </div>
              </p>
              <div className='car-details-multibtn-div'>
                <div className='multi-phone-combining-div'>
                <div className={phoneToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>Call</div>
                <button 
                onMouseEnter={()=>handlePhoneTooltip(items.id)} 
                onMouseLeave={()=>setPhonneToolTip(false)} 
                className='car-details-multi-btn multi-button-phone'>
                  <i className="fa-solid fa-phone multi-btn-phone"></i>
                  </button>
                </div>
                <div className='multi-whatsapp-combining-div'>
                <div className={whatsappToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>Whatsapp</div>
                <button
                 onMouseEnter={()=>handleWhatsappTooltip(items.id)} 
                 onMouseLeave={()=>setWhatsappToolTip(false)} 
                className='car-details-multi-btn multi-button-whatsapp'><i className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
                </div>
                <div className='multi-Enquiry-combining-div'>
                <div className={enquiryToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>Enquiry</div>
                <button
                onMouseEnter={()=>handleEnquiryTooltip(items.id)} 
                onMouseLeave={()=>setEnquiryToolTip(false)}
                 className='car-details-multi-btn multi-button-enquiry'><span style={{fontSize:'1.8rem'}} className="material-symbols-outlined multi-btn-enquiry">
                 data_info_alert
                 </span></button>
                </div>
                <div className='multi-Enquiry-combining-div'>
                <div className={viewToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>View Details</div>
                <button
                onMouseEnter={()=>handleViewTooltip(items.id)} 
                onMouseLeave={()=>setViewToolTip(false)}
                 className='car-details-multi-btn multi-button-enquiry'><i className="fa-solid fa-eye multi-btn-View"></i></button>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="Home-page-navigation-div"></div>
      </div>
    </div>
  );
}

export default Home