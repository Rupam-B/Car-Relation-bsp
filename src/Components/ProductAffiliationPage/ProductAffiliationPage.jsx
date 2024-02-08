


import React, { useEffect, useState } from 'react'
import './ProductAffiliationStyle.css'
// import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Circle } from 'rc-progress';
import BaseURL from '../../apiconfig';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { isWebview } from '@dvlden/is-webview'

const ProductAffiliationPage = () => {
     const navigate = useNavigate()
     console.log(navigate)
    const { affiliationId, carId } = useParams();

    // console.log(affiliationId, 'AffiliationId')
    // console.log(carId, 'Carid')

  const [dataOfShowingAdd,setDataOfShowingAdd] = useState()
  // console.log(dataOfShowingAdd, 'Data of showing add')


  const [imageDislayNumber, setImageDisplayNumber] = useState(0);
  const [waitWhileloading, setWaitWhileloading] = useState(true);
  const [phoneToolTip, setPhonneToolTip] = useState(false)
  const [whatsappToolTip, setWhatsappToolTip] = useState(false)
  const [enquiryToolTip, setEnquiryToolTip] = useState(false)
  const [enqEnable, setEnqEnable] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false);

  const [enqDefaultvalue, setEnqDefaultValue] = useState('')
  const [enqCustomerName,setEnqCustomerName] = useState("")
  // console.log(enqCustomerName,'customer name')
  const [enqCustomerMob,setEnqCustomerMob] = useState("")
  // console.log(enqCustomerMob, 'customer mob')
  

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSetImage1 =  ()=>{
    if(dataOfShowingAdd&&dataOfShowingAdd.image[1]){
      setImageDisplayNumber(1)
    }
  }
  const handleSetImage2 =  ()=>{
    if(dataOfShowingAdd&&dataOfShowingAdd.image[2]){
      setImageDisplayNumber(2)
    }
  }
  const handleSetImage3 =  ()=>{
    if(dataOfShowingAdd&&dataOfShowingAdd.image[3]){
      setImageDisplayNumber(3)
    }
  }
  const handleSetImage4 =  ()=>{
    if(dataOfShowingAdd&&dataOfShowingAdd.image[4]){
      setImageDisplayNumber(4)
    }
  }

  // ======Fetch Extended Adds Data ========

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/car/${carId}`, {
          method:'GET',
          headers: {
            Accept: 'application/json',
          },
        });
  
        if (response.status >= 200 && response.status < 300) {
          const targetCardata = response.data;
          if(targetCardata){
            setDataOfShowingAdd(targetCardata.data)
            setWaitWhileloading(false)
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setWaitWhileloading(false)
      }
    };
  
    fetchData();
  }, [carId]);

  // console.log(apiData.data)

// ======Calling and Whatsapp Feature=======
const initiatePhoneCall = (phoneNumber) => {
  const telURL = `tel:${phoneNumber}`;
  window.location.href = telURL;
  setTimeout(() => {
    setPhonneToolTip(false)
    
  }, 2000);
};
const openWhatsAppChat = () => {
  const phoneNumber = '+919300007780';
  const message = `Hello, I am reaching out via Car Relation App. I like to know more the listed ${dataOfShowingAdd.make}  ${dataOfShowingAdd.model}  ${dataOfShowingAdd.mfg_year} ${affiliationId}  link: https://car-relation-bsp-3396.netlify.app/DisplayCarDetailsOnlyView/${carId}`;
  const encodedPhoneNumber = encodeURIComponent(phoneNumber);
  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://api.whatsapp.com/send?phone=${encodedPhoneNumber}&text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');
  setTimeout(() => {
    setWhatsappToolTip(false);
  }, 2000);
};
  // ======Calling and Whatsapp Feature End=======
  const openEnquiryForm = (make,model,year,carEid) => {
    setEnqDefaultValue(`${make} ${model} ${year} link: https://car-relation-bsp-3396.netlify.app/DisplayCarDetailsOnlyView/${carEid}`)
    setEnqEnable(true)
    setTimeout(() => {
      setEnquiryToolTip(false)
      
    }, 2000);
  };

  const generateEnquiry = async (e) => {
    e.preventDefault();
    if (enqCustomerName && enqCustomerMob && enqDefaultvalue !== "") {
      if(termsChecked){     
      try {
        // const userAffiliationDetails = userAffiliationNo&&userAffiliationNo.toString()
        const formData = new FormData();
        formData.append("car_id", carId);
        formData.append("name", enqCustomerName);
        formData.append("phone", enqCustomerMob);
        formData.append("enquiry", enqDefaultvalue);
        // formData.append("aff_user_id",userAffiliationDetails&&userAffiliationDetails);
        // formData.append("user_id", ownerSerial);
  
        const response = await fetch(`${BaseURL}/car/enquiry`, {
          method: "POST",
          headers: {
            Accept:'application/json',
          },
          body: formData,
        });
  
        const EnqSubmitted = await response.json();
  
        if (response.ok) {
          // Enq Subbmitted succesfuly
          toast.success(EnqSubmitted.message);
          console.log(EnqSubmitted);
          setEnqEnable(false)
          setEnqCustomerName('')
          setEnqCustomerMob('')
        } else {
          // Enq Subbmision failed
          toast.error(EnqSubmitted.message);
          console.log(EnqSubmitted);
        }
      } catch (error) {
        console.error("Error during Subbmision:", error);
        toast.error("An error occurred during Submission.");
      }
    }
    else{
      toast.error("Verification Required")
    }
    } else {
      toast.error("Please Fill All The Details");
    }
  };


  // function isWebView() {
  //   // Check if the user agent includes specific keywords that indicate a WebView
  //   return /Android/i.test(navigator.userAgent);
  // }

  // useEffect(() => {
  //   const handleWebViewLogic = () => {
  //     if (!isWebView()) {
  //       // Redirect to /UserReferals for non-WebView requests
  //       navigate('/FinancePage');
  //     }
  //   };

  //   handleWebViewLogic();
  // }, [navigate]);

  useEffect(()=>{
  if (!isWebview(window.navigator.userAgent)) {
    window.location.navigate('https://play.google.com/store/apps/details?id=carrelation.development.com')
  }
},[navigate])


  return (

    <div className='DisplayCar-Main-div'>

       {/* =========Uploading Add Wait Div ========= */}
       <div className={waitWhileloading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Loading...</h4>
      </div>
      {/* ================= */}
      <div className='DisplayCar-Sub-div'>
        <div className='Display-car-main-img-div'>
          <img src={dataOfShowingAdd&&dataOfShowingAdd.image[imageDislayNumber]} alt="" />
        </div>

        {/* ====== Enquiry Form ========= */}
        <div className={enqEnable ? 'Enquiry-form active' : 'Enquiry-form-inactive'}>
          <div className='Enquiry-form-sub-div'>
            <h3>Enquiry</h3>
            <form className='Enquiry-form-tag' action="">
              <i onClick={() => setEnqEnable(false)} className="fa-solid fa-xmark enquiry-close-icon"></i>
              <label htmlFor="User-Name">Name</label>
              <input onChange={(e)=>setEnqCustomerName(e.target.value)} type="text" id="User-Name" name="Kilo-meters" />
              <label htmlFor="User-Mobile">Mobile no.</label>
              <input  onChange={(e)=>setEnqCustomerMob(e.target.value)} type="text" id="User-Mobile" name="Kilo-meters" />
              <p><span>ProductAfId: </span>{affiliationId}</p>
              <label htmlFor="User-Querry">Querry</label>
              <input onChange={(e)=>setEnqDefaultValue(e.target.value)} type="text" defaultValue={enqDefaultvalue} id="User-Querry" />
              <button onClick={generateEnquiry} className='btn enquiry-form-submit-btn'>Submit</button>
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
        {/* ============ */}

        
        <div className='Display-car-Extended-img-div'>
          {dataOfShowingAdd?<>
            <img onClick={()=>setImageDisplayNumber(0)}
             src={dataOfShowingAdd.image[0]&&dataOfShowingAdd.image[0]} alt="" />
            <img onClick={handleSetImage1}
             src={dataOfShowingAdd.image[1]&&dataOfShowingAdd.image[1]} alt="" />
            <img onClick={handleSetImage2}
             src={dataOfShowingAdd.image[2]&&dataOfShowingAdd.image[2]} alt="" />
            <img onClick={handleSetImage3}
             src={dataOfShowingAdd.image[3]&&dataOfShowingAdd.image[3]} alt="" />
            <img onClick={handleSetImage4}
             src={dataOfShowingAdd.image[4]&&dataOfShowingAdd.image[4]} alt="" />
             </>:''}
        </div>
        <div style={{ marginBottom: '3vh' }} className='car-details-multibtn-div disp-car-extra-class'>
          <div className='multi-phone-combining-div'>
            <div
             className={phoneToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Call</div>
            <button
              onMouseEnter={() => setPhonneToolTip(true)}
              onMouseLeave={() => setPhonneToolTip(false)}
              onClick={() =>initiatePhoneCall('+919300007780')}
              className='car-details-multi-btn multi-button-phone'>
              <i style={{ fontSize: '1.4rem' }} className="fa-solid fa-phone multi-btn-phone"></i>
            </button>
          </div>
          <div className='multi-whatsapp-combining-div'>
            <div
             className={whatsappToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Whatsapp</div>
            <button
              onMouseEnter={() => setWhatsappToolTip(true)}
              onMouseLeave={() => setWhatsappToolTip(false)}
              onClick={openWhatsAppChat}
              className='car-details-multi-btn multi-button-whatsapp'><i style={{ fontSize: '1.5rem' }} className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
          </div>
          <div className='multi-Enquiry-combining-div'>
            <div className={enquiryToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Enquiry</div>
            <button
              onMouseEnter={() => setEnquiryToolTip(true)}
              onMouseLeave={() => setEnquiryToolTip(false)}
              onClick={()=>openEnquiryForm(dataOfShowingAdd.make,dataOfShowingAdd.model,dataOfShowingAdd.mfg_year,dataOfShowingAdd.id)}
              className='car-details-multi-btn multi-button-enquiry'><i style={{ fontSize: '1.5rem' }} className="fa-regular fa-envelope multi-btn-enquiry"></i></button>
          </div>
        </div>

        {/* ----------------------Disp-Condition-div----------------- */}
        {/* <div className='Disp-car-condition-div border'>
          <div className=" text-center circular-progress-main-div border mx-3" style={{boxShadow:'inset 1px 1px 5px 0 #aea400',borderRadius:'5px'}}>
            <div className='circular-progress-upper-div'>
              <div className='circular-circle-div'>
                <Circle percent={80}
                  strokeWidth={14}
                  strokeColor="#aea400"
                  trailColor='#f3f4f7'
                  trailWidth={14}
                  gapPosition='top'
                />
                <div className='percentage-text' style={{color:'#aea400'}}>
                  80%
                </div>
              </div>
            </div>
            <hr style={{ width:'80%', margin:"auto",marginBottom: '0', marginTop: '0',height:'0' }} />
            <div className="knob-label">
              <p><b>Overall</b></p>
            </div>
          </div>
          <div className=" text-center border circular-progress-main-div mx-3" style={{boxShadow:'inset 1px 1px 5px 0 #037ef3',borderRadius:'5px'}}>
            <div className='circular-progress-upper-div'>
              <div className='circular-circle-div'>
                <Circle percent={60}
                  strokeWidth={14}
                  strokeColor="#037ef3"
                  trailColor='#f3f4f7'
                  trailWidth={14}
                  gapPosition='top'
                />
                <div className='percentage-text' style={{color:'#037ef3'}}>
                  60%
                </div>
              </div>
            </div>
            <hr style={{ width:'80%', margin:"auto",marginBottom: '0', marginTop: '0',height:'0' }} />
            <div className="knob-label">
              <p><b>Engine</b></p>
            </div>
          </div>
          <div className=" text-center border circular-progress-main-div mx-3" style={{boxShadow:'inset 1px 1px 5px 0 #da1884',borderRadius:'5px'}} >
            <div className='circular-progress-upper-div'>
              <div className='circular-circle-div'>
                <Circle percent={40}
                  strokeWidth={14}
                  strokeColor="#da1884"
                  trailColor='#f3f4f7'
                  trailWidth={14}
                  gapPosition='top'
                />
                <div className='percentage-text' style={{color:'#da1884'}}>
                  40%
                </div>
              </div>
            </div>
            <hr style={{ width:'80%', margin:"auto",marginBottom: '0', marginTop: '0',height:'0' }} />
            <div className="knob-label">
              <p><b>Tyres</b></p>
            </div>
          </div>
          <div className=" text-center border circular-progress-main-div mx-3" style={{boxShadow:'inset 1px 1px 5px 0 #613854',borderRadius:'5px'}}>
            <div className='circular-progress-upper-div'>
              <div className='circular-circle-div'>
                <Circle percent={95}
                  strokeWidth={14}
                  strokeColor="#613854"
                  trailColor='#f3f4f7'
                  trailWidth={14}
                  gapPosition='top'
                />
                <div className='percentage-text' style={{color:'#613854'}}>
                  95%
                </div>
              </div>
            </div>
            <hr style={{ width:'80%', margin:"auto",marginBottom: '0', marginTop: '0',height:'0' }} />
            <div className="knob-label">
              <p><b>AC</b></p>
            </div>
          </div>
        </div> */}
      </div>
      {/* ----------------------********----------------- */}

      <div className='Car-Details-div'>
        <h4 className='Car-Details-to4-heading'>Details</h4>

        {dataOfShowingAdd?(
          <>
          <p><span>Make: </span>{dataOfShowingAdd.make}</p>
          <p><span>Model: </span>{dataOfShowingAdd.model}</p>
          <p><span>Mfg Year: </span>{dataOfShowingAdd.mfg_year}</p>
          <p><span>Kilometers: </span>{dataOfShowingAdd.km_driven}</p>
          <p><span>Owner: </span>{dataOfShowingAdd.owners}</p>
          <p><span>Price: </span>{dataOfShowingAdd.sale_value}</p>
          <p><span className='Car-Details-div-description-span'>Details: </span><span className='Car-Details-div-description-span-next'>{dataOfShowingAdd.description}</span></p>
          </>

        ):
            <h6>Loading</h6>
        }

      </div>
      {/* <div className='Car-OverView-div'>
        <h4 className='Car-Details-top-heading'>OverView</h4>
        <p>Good</p>

      </div>
      <div className='Car-Features-div'>
        <h4 className='Car-Details-top-heading'>Features</h4>
        <p>Automatic</p>

      </div> */}
    </div>
  )
}

export default ProductAffiliationPage