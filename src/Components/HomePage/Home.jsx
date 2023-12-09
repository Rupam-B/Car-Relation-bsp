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

  const handleFavouriteActive =(favid)=>{
    setFavouriteactive(!favouriteactive)
    setFavouriteId(favid)
  }
  const handleBookmarkActive =(favid)=>{
    setBookmarkactive(!bookmarkactive)
    setBookmarkId(favid)
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
              <h5 className="card-title">{items.rating}</h5>
              <i onClick={()=>handleFavouriteActive(items.id)}
              className={favouriteactive&&favouriteid===items.id?"fa-solid fa-heart favourites-icon-active":'fa-solid fa-heart favourites-icon-inactive'}></i>
              <i onClick={()=>handleBookmarkActive(items.id)}
               className=
                {bookmarkactive&&bookmarkid===items.id?"fa-regular fa-bookmark bookmark-icon-active":'fa-regular fa-bookmark bookmark-icon-inactive'}>
               </i>
              {/* <p className='Date-icon'>9 Dec</p> */}
              <p className="card-text">
                {items.Description}
              </p>
              <div className='car-details-multibtn-div'>
                <button className='car-details-multi-btn multi-button-phone'><i class="fa-solid fa-phone multi-btn-phone"></i></button>
                <button className='car-details-multi-btn multi-button-whatsapp'><i class="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
                <button className='car-details-multi-btn multi-button-enquiry'><i class="fa-brands fa-telegram multi-btn-enquiry"></i></button>
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