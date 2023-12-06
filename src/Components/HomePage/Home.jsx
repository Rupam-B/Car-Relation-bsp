import React from 'react'
import './HomeStyle.css'
import carMainData from './carUrls'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addThisImage } from "../../Reduxs/action";


const Home = () => {
  const HomeDispatch = useDispatch()

  const carReqData = carMainData.carMainData
  return (
    <div className="Home-Main-div">
      <div className="Home-sub-div">
        <div className="Home-Listing-Header">
          <h1>Car-Listing</h1>
          <div className='buy-sell-btn'>
            <Link to={'/SellCarPortal'} className='buy-sell-btn-one'>Sell</Link>
            <Link to={'/'} className='buy-sell-btn-two'>Buy</Link>
          </div>
        </div>
        <div className="Home-middle-content">
          {carReqData.map((items)=>(
          <div key={items.id} className="card card-width-18">
            <img src={items.src} className="card-img-top" alt=""/>
            <div className="card-body">
              <h5 className="card-title">{items.rating}</h5>
              <p className="card-text">
                {items.Description}
              </p>
              <Link onClick={()=>HomeDispatch(addThisImage(items.src))} to={'/DisplayCarDetails'} className="btn btn-danger">See Details</Link>
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