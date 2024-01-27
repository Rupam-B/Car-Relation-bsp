import React, { useState,useEffect } from 'react'
import './InsurancePgstyle.css'
// import  InsuranceCompanyImages from './InsuranceImgs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BaseURL from '../../apiconfig';



const Insurancepage = () => {

  // const CompanyDetails = InsuranceCompanyImages

  const [phoneToolTip,setPhonneToolTip] = useState(false)
  const [whatsappToolTip,setWhatsappToolTip] = useState(false)
  const [enquiryToolTip,setEnquiryToolTip] = useState(false)

  const [enqEnable,setEnqEnable] = useState(false)
  const [enqCustomerName,setEnqCustomerName] = useState("")
  const [enqCustomerMob,setEnqCustomerMob] = useState("")
  const [enqCustomerEnquiry,setEnqCustomerEnquiry] = useState("")

  const [termsChecked, setTermsChecked] = useState(false);
  const [userStoreAdds,setUserStoredAdds] = useState()

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  
  // ======Calling and Whatsapp EnquiryForm Feature=======

  const initiatePhoneCall = (phoneNumber) => {
    const telURL = `tel:${phoneNumber}`;
    window.location.href = telURL;
    setTimeout(() => {
      setPhonneToolTip(false)
      
    }, 2000);
  };
  const openWhatsAppChat = () => {
    const phoneNumber = '+919300007780';
    const message = `Hello, I am reaching out via Car Relation App. I like to know more the Insurance Details`
  setTimeout(() => {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${encodedPhoneNumber}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
      
    }, 500);

    
    setTimeout(() => {
      setWhatsappToolTip(false);
    }, 2000);
  };

  // ======Calling and Whatsapp EnquiryForm Feature End=======


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/service/insurance`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if (data) {
            // console.log(data.data)
            setUserStoredAdds(data.data);
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const generateEnquiry = async (e) => {
    e.preventDefault();
    if (enqCustomerName && enqCustomerMob && enqCustomerEnquiry !== "") {
      if(termsChecked){     
      try {
        // const userAffiliationDetails = userAffiliationNo&&userAffiliationNo.toString()
        const formData = new FormData();
        formData.append("name", enqCustomerName);
        formData.append("phone", enqCustomerMob);
        formData.append("enquiry", enqCustomerEnquiry);
  
        const response = await fetch(`${BaseURL}/service/insurance/enquiry`, {
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
          setEnqCustomerEnquiry('')
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

  return (
    <div className='Finance-page-main-div'>
      <div className={enqEnable?'Enquiry-form active':'Enquiry-form-inactive'}>
            <div className='Enquiry-form-sub-div'>
              <h3>Enquiry</h3>
              <form className='Enquiry-form-tag' action="">
              <i onClick={()=>setEnqEnable(false)} className="fa-solid fa-xmark enquiry-close-icon"></i>
              <label htmlFor="User-Name">Name</label>
              <input value={enqCustomerName} onChange={(e)=>setEnqCustomerName(e.target.value)} type="text" id="User-Name" name="Kilo-meters" />
              <label htmlFor="User-Mobile">Mobile no.</label>
              <input value={enqCustomerMob} onChange={(e)=>setEnqCustomerMob(e.target.value)} type="text" id="User-Mobile" name="Kilo-meters" />
              <label htmlFor="User-Querry">Querry</label>
              <input value={enqCustomerEnquiry} onChange={(e)=>setEnqCustomerEnquiry(e.target.value)} type="text"  id="User-Querry" />
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
        <div className='Finance-page-sub-div'>
            <div className='Finance-company-images-div'>
              {/* {CompanyDetails.map((itam)=>( */}
                <div className='Finance-company-image-showing-div'>
                  <img src={userStoreAdds&&userStoreAdds.banner_image} alt="" />

                </div>
              {/* ))} */}
            </div>
            <div className='Finance-company-advertisement-images-div' >
              {/* {CompanyDetails.map((itam)=>( */}
                <div className='Finance-company-image-showing-div'>
                  <img src={userStoreAdds&&userStoreAdds.advertisement_image} alt="" />
                </div>
              {/* ))} */}
            </div>
            {/* <div className='Finance-company-input-div'>
              <label htmlFor="Finance-company-options">Select Insurance Company :</label>
              <select  id="Finance-company-options">
              <option value="All">All</option>
              {CompanyDetails.map((itemss)=>(
                <option key={itemss.id} value={itemss.name}>{itemss.name}</option>
              ))}
              </select>
              
            </div> */}

            <div className='car-details-multibtn-div Finance-comp-multi-btn'>
                <div className='multi-phone-combining-div'>
                <div 
                 className={phoneToolTip?'phone-tooltip':'phone-tooltip-inactive'}>Call</div>
                <button 
                onMouseEnter={()=>setPhonneToolTip(true)} 
                onMouseLeave={()=>setPhonneToolTip(false)} 
                onClick={() => initiatePhoneCall('9039065247')}
                className='car-details-multi-btn multi-button-phone'>
                  <i style={{fontSize:'1.4rem'}} className="fa-solid fa-phone multi-btn-phone"></i>
                  </button>
                </div>
                <div className='multi-whatsapp-combining-div'>
                <div 
                 className={whatsappToolTip?'phone-tooltip':'phone-tooltip-inactive'}>Whatsapp</div>
                <button
                 onMouseEnter={()=>setWhatsappToolTip(true)} 
                 onMouseLeave={()=>setWhatsappToolTip(false)} 
                 onClick={openWhatsAppChat}
                className='car-details-multi-btn multi-button-whatsapp'><i style={{fontSize:'1.5rem'}} className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
                </div>
                <div className='multi-Enquiry-combining-div'>
                <div className={enquiryToolTip?'phone-tooltip':'phone-tooltip-inactive'}>Enquiry</div>
                <button
                onMouseEnter={()=>setEnquiryToolTip(true)} 
                onMouseLeave={()=>setEnquiryToolTip(false)}
                onClick={()=>setEnqEnable(true)}
                 className='car-details-multi-btn multi-button-enquiry'><i style={{fontSize:'1.5rem'}} className="fa-regular fa-envelope multi-btn-enquiry"></i></button>
                </div>
              </div>

            <div className='Finance-Documents-Req-div'>
                <h4>Documents Required</h4>
                <div dangerouslySetInnerHTML={{ __html: userStoreAdds && userStoreAdds.details }} />
            </div>
        </div>
    </div>
  )
}

export default Insurancepage