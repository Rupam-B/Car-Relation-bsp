import React, { useEffect, useState } from 'react'
import './HomeStyle.css'
import BaseUrl from '../../apiconfig'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addThisImage } from "../../Reduxs/action";
import { AddTargetingToDisplay } from '../../Reduxs/action'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Home = () => {
  const HomeDispatch = useDispatch()
  const homeNavigate = useNavigate()
  const userVerify =localStorage.getItem('car-relation-user-token')
  const [favouriteactive,setFavouriteactive] = useState(false)
  const [favouriteid,setFavouriteId] = useState('')
  const [bookmarkactive,setBookmarkactive] = useState(false)
  const [bookmarkid,setBookmarkId] = useState('')
  
  const [phoneToolTip,setPhonneToolTip] = useState(false)
  const [whatsappToolTip,setWhatsappToolTip] = useState(false)
  const [enquiryToolTip,setEnquiryToolTip] = useState(false)
  const [viewToolTip,setViewToolTip] = useState(false)
  const [phoneId,setPhonneId] = useState("")
  
  const [carQuerry,setCarQuerry] = useState("")

  // Api Data
  const [apiData,setApiData] = useState([])
  const [enqEnable,setEnqEnable] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false);

  const handleNavigateToExtendSelectedAdd =(id, image, make)=>{
    HomeDispatch(addThisImage(image, make))
    HomeDispatch(AddTargetingToDisplay(id))
  }

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (termsChecked) {
      toast.success("Enquiry Subbmitted")
      setTermsChecked(false)
    } else {
      toast.error("Verification Required")
    }
  };
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
  const handleViewDetailsAction =(id)=>{
    HomeDispatch(AddTargetingToDisplay(id))
    homeNavigate('/DisplayCarDetails')
    
  }

  const HandleEnquiryFunc =(querryData)=>{
    setEnqEnable(true)
    setCarQuerry(querryData)

  }
  const HandleShareFunc =()=>{
    toast.success('Referral service will be available soon')

  }
  // ======Calling and Whatsapp Feature=======

  const initiatePhoneCall = (phoneNumber) => {
    const telURL = `tel:${phoneNumber}`;
    window.location.href = telURL;
  };
    const openWhatsAppChat = (phoneNumber) => {
      const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
      window.open(whatsappURL, '_blank');
    };
  // ======Calling and Whatsapp Feature End=======

  const carReqData = apiData.data && apiData.data;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/cars`, {
          mode:'no-cors',
          headers: {
            Accept: 'application/json',
          },
        });
  
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if(data){
            setApiData(data)
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // useEffect(()=>{
  //   if(apiData.data){
  //     console.log(apiData.data);
  //   }
  // },[apiData])
   

  return (
    <div className="Home-Main-div">
      <div className="Home-sub-div">
        <div className="Home-Listing-Header">
          <div className={enqEnable?'Enquiry-form active':'Enquiry-form-inactive'}>
            <div className='Enquiry-form-sub-div'>
              <h3>Enquiry</h3>
              <form className='Enquiry-form-tag' action="">
              <i onClick={()=>setEnqEnable(false)} className="fa-solid fa-xmark enquiry-close-icon"></i>
              <label htmlFor="User-Name">Name</label>
              <input type="text" id="User-Name" name="Kilo-meters" />
              <label htmlFor="User-Mobile">Mobile no.</label>
              <input type="text" id="User-Mobile" name="Kilo-meters" />
              <label htmlFor="User-Querry">Querry</label>
              <input type="text" defaultValue={carQuerry}  id="User-Querry" />
              <button onClick={handleSubmit} className='btn enquiry-form-submit-btn'>Submit</button>
              <div className='captcha-div'>
              <input
              className='Terms-conditions-checkbox'
              type="checkbox"
              id="termsCheckbox"
              checked={termsChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="termsCheckbox">Verify that you are not a Robot</label>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="Home-middle-content">
          {carReqData && carReqData.length > 0?
          carReqData.map((items)=>(
          <div key={items.id} className="card card-width-18">
            <div className='Home-middle-content-image-div'>
            <Link  onClick={()=>handleNavigateToExtendSelectedAdd(items.id,items.image,items.make)} to={'/DisplayCarDetails'}><img src={items.image[0]} className="card-img-top" alt="No Images Available"/></Link>
            </div>
           
            <div className="card-body home-card-body">
              <div className='car-home-main-title-div'>
              <h6 className="card-title car-home-main-title">{items.make.length>23?`${items.make.slice(0,23)}...`:items.make}</h6>
              <i 
              onClick={HandleShareFunc} 
              className={userVerify?"fa-solid fa-share-nodes share-icon-active":"fa-solid fa-share-nodes share-icon-inactive"}>
              </i>
              <i onClick={()=>handleBookmarkActive(items.id)}
               className=
                {bookmarkactive&&bookmarkid===items.id?"fa-regular fa-bookmark bookmark-icon-active":'fa-regular fa-bookmark bookmark-icon-inactive'}>
               </i>
               
              </div>
              <i onClick={()=>handleFavouriteActive(items.id)}
              className={favouriteactive&&favouriteid===items.id?"fa-solid fa-heart favourites-icon-active":'fa-solid fa-heart favourites-icon-inactive'}></i>
              
              <div className="card-text">
              {items.model.length>20?`${items.model.slice(0,20)}...`:items.model}
              <div className='car-cost-heading-div'>
              <h5 className='car-cost-heading5'>₹{items.sale_value}</h5>
              <p>{items.km_driven}kms</p>
              </div>
              </div>
              <div className='car-details-multibtn-div'>
                <div className='multi-phone-combining-div'>
                <div onClick={() => initiatePhoneCall('9039065247')}
                 className={phoneToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>Call</div>
                <button 
                onMouseEnter={()=>handlePhoneTooltip(items.id)} 
                onMouseLeave={()=>setPhonneToolTip(false)} 
                className='car-details-multi-btn multi-button-phone'>
                  <i style={{fontSize:'1.4rem'}} className="fa-solid fa-phone multi-btn-phone"></i>
                  </button>
                </div>
                <div className='multi-whatsapp-combining-div'>
                <div onClick={() => openWhatsAppChat('9039065247')}
                 className={whatsappToolTip&&phoneId===items.id?'phone-tooltip':'phone-tooltip-inactive'}>Whatsapp</div>
                <button
                 onMouseEnter={()=>handleWhatsappTooltip(items.id)} 
                 onMouseLeave={()=>setWhatsappToolTip(false)} 
                className='car-details-multi-btn multi-button-whatsapp'><i style={{fontSize:'1.5rem'}} className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
                </div>
                <div className='multi-Enquiry-combining-div'>
                <div className={enquiryToolTip&&phoneId===items.id?'enquiry-tooltip':'phone-tooltip-inactive'}>Enquiry</div>
                <button
                onMouseEnter={()=>handleEnquiryTooltip(items.id)} 
                onMouseLeave={()=>setEnquiryToolTip(false)}
                onClick={()=>HandleEnquiryFunc(items.description)}
                 className='car-details-multi-btn multi-button-enquiry'><i style={{fontSize:'1.5rem'}} className="fa-regular fa-envelope multi-btn-enquiry"></i></button>
                </div>
                <div className='multi-Enquiry-combining-div'>
                <div onClick={()=>handleViewDetailsAction(items.id)} className={viewToolTip&&phoneId===items.id?'enquiry-tooltip':'phone-tooltip-inactive'}>View Details</div>
                <button
                onMouseEnter={()=>handleViewTooltip(items.id)} 
                onMouseLeave={()=>setViewToolTip(false)}
                 className='car-details-multi-btn multi-button-enquiry'><i style={{fontSize:'1.45rem'}} className="fa-solid fa-eye multi-btn-View"></i></button>
                </div>
              </div>
            </div>
          </div>
          )):
          <h5>Loading...</h5>
}
        </div>
        <div className="Home-page-navigation-div"></div>
      </div>
    </div>
  );
}

export default Home


