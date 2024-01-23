import React, { useEffect, useState } from 'react'
import './DispCarStyle.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Circle } from 'rc-progress';
import BaseURL from '../../apiconfig';
import axios from 'axios';


const DispCarDetails = () => {

  const userVerify =localStorage.getItem('car-relation-user-token')
  const userAffiliationNo =localStorage.getItem('car-relation-user-AffId')


  const gwtExtendesAddDispalyId = useSelector((state) => state.TargetingWhichAddToDisplay)
  if(gwtExtendesAddDispalyId){
  localStorage.setItem('car-relation-Add-showing-Id', JSON.stringify(gwtExtendesAddDispalyId))
  }
  const extractExtendesAddDispalyId = localStorage.getItem('car-relation-Add-showing-Id')
  const ExtendesAddDispalyId = parseInt(extractExtendesAddDispalyId)
  // console.log(ExtendesAddDispalyId)

  const [dataOfShowingAdd,setDataOfShowingAdd] = useState()
  // console.log(dataOfShowingAdd, 'Data of showing add')

  const [sharetooltipVisible, setShareTooltipVisible] = useState(false);
  const [isShareIdCopied, setIsShareIdCopied] = useState(false);
  const [imageDislayNumber, setImageDisplayNumber] = useState(0);
  const [waitWhileloading, setWaitWhileloading] = useState(true);
  const [phoneToolTip, setPhonneToolTip] = useState(false)
  const [whatsappToolTip, setWhatsappToolTip] = useState(false)
  const [enquiryToolTip, setEnquiryToolTip] = useState(false)
  const [enqEnable, setEnqEnable] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false);
  

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

  const HandleShareFunc =()=>{
    setShareTooltipVisible(true)
    setTimeout(() => {
      setShareTooltipVisible(false)
      setIsShareIdCopied(false)
      
    }, 2000);


  }

  const handleCopyToClipboard = () => {
    const dynamicLink = `https://car-relation-bsp-3396.netlify.app/DisplayCarDetailsAffiliation/${userAffiliationNo}/${ExtendesAddDispalyId}`;
    navigator.clipboard.writeText(dynamicLink).then(
      ()=>{
        console.log('copied')
        setIsShareIdCopied(true)
      },
      (err)=>{
        console.log(err)
      }
    );
    
  };

  // ======Fetch Extended Adds Data ========

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/car/${ExtendesAddDispalyId}`, {
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
  }, [ExtendesAddDispalyId]);

  // console.log(apiData.data)

// ======Calling and Whatsapp Feature=======
  const initiatePhoneCall = (phoneNumber) => {
    const telURL = `tel:${phoneNumber}`;
    window.location.href = telURL;
    setTimeout(() => {
      setPhonneToolTip(false)
      
    }, 2000);
  };
    const openWhatsAppChat = (phoneNumber) => {
      const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
      window.open(whatsappURL, '_blank');
      setTimeout(() => {
        setWhatsappToolTip(false)
        
      }, 2000);
    };
    const openEnquiryForm = () => {
      setEnqEnable(true)
      setTimeout(() => {
        setEnquiryToolTip(false)
        
      }, 2000);
    };
  // ======Calling and Whatsapp Feature End=======



  return (
    <div className='DisplayCar-Main-div'>
      
       {/* =========Uploading Add Wait Div ========= */}
       <div className={waitWhileloading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Loading...</h4>
      </div>
      {/* ================= */}

      {/* ====== Enquiry Form ========= */}
      <div className={enqEnable ? 'Enquiry-form active' : 'Enquiry-form-inactive'}>
          <div className='Enquiry-form-sub-div'>
            <h3>Enquiry</h3>
            <form className='Enquiry-form-tag' action="">
              <i onClick={() => setEnqEnable(false)} className="fa-solid fa-xmark enquiry-close-icon"></i>
              <label htmlFor="User-Name">Name</label>
              <input type="text" id="User-Name" name="Kilo-meters" />
              <label htmlFor="User-Mobile">Mobile no.</label>
              <input type="text" id="User-Mobile" name="Kilo-meters" />
              <label htmlFor="User-Querry">Querry</label>
              <input type="text" defaultValue={dataOfShowingAdd&&dataOfShowingAdd.description} id="User-Querry" />
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
        {/* ============ */}






      {/* ====Main Content Start ====== */}
      <div className='DisplayCar-Sub-div'>
        <div className='Display-car-main-img-div'>
        <div className='share-icon-with-tooltip-div'>
              <div onClick={handleCopyToClipboard}
                 className={sharetooltipVisible?'share-tooltip':'phone-tooltip-inactive'}>
                  <i className="fa-solid fa-link"></i>
                  {isShareIdCopied?' Copied':' Copy Affiliation Link'}
                 </div>
                <i
                  onClick={HandleShareFunc}
                  className={userVerify ? "fa-solid fa-share-nodes share-icon-active" : "fa-solid fa-share-nodes share-icon-inactive"}
                  data-tip="Copy link to clipboard"
                 ></i>
              </div>
          <img src={dataOfShowingAdd&&dataOfShowingAdd.image[imageDislayNumber]} alt="" />
        </div>
        
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
              onClick={() => initiatePhoneCall('9300007780')}
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
              onClick={() => openWhatsAppChat('9300007780')}
              className='car-details-multi-btn multi-button-whatsapp'><i style={{ fontSize: '1.5rem' }} className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
          </div>
          <div className='multi-Enquiry-combining-div'>
            <div className={enquiryToolTip ? 'enquiry-tooltip' : 'phone-tooltip-inactive'}>Enquiry</div>
            <button 
              onMouseEnter={() => setEnquiryToolTip(true)}
              onMouseLeave={() => setEnquiryToolTip(false)}
              onClick={openEnquiryForm}
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
          <p><span>Owner sr: </span>{dataOfShowingAdd.owners}</p>
          <p><span>Price: </span>{dataOfShowingAdd.sale_value}</p>
          <p><span className='Car-Details-div-description-span'>Details: </span>{dataOfShowingAdd.description}</p>
          </>

        ):
            <h6>Loading</h6>
        }

      </div>
      <div className='Car-OverView-div'>
        <h4 className='Car-Details-top-heading'>OverView</h4>
        <p>Good</p>

      </div>
      <div className='Car-Features-div'>
        <h4 className='Car-Details-top-heading'>Features</h4>
        <p>Automatic</p>

      </div>
      {/* <div className='Car-EnquiryForm-div'>
                <h3>Enquire Now</h3>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Mobile No.'/>
                <input type="text" placeholder='Querry'/>
                <button className='Enquiry-Submit-btn'>Submit</button>
            </div> */}



    </div>
  )
}

export default DispCarDetails