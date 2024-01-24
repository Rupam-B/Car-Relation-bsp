import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseURL from '../../apiconfig';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailsOnlyView = () => {


    const {carId } = useParams();

    // console.log(affiliationId, 'AffiliationId')
    // console.log(carId, 'Carid')

  const [dataOfShowingAdd,setDataOfShowingAdd] = useState()
  // console.log(dataOfShowingAdd, 'Data of showing add')


  const [imageDislayNumber, setImageDisplayNumber] = useState(0);
  const [waitWhileloading, setWaitWhileloading] = useState(true);
//   const [phoneToolTip, setPhonneToolTip] = useState(false)
//   const [whatsappToolTip, setWhatsappToolTip] = useState(false)
//   const [enquiryToolTip, setEnquiryToolTip] = useState(false)
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
//   const initiatePhoneCall = (phoneNumber) => {
//     const telURL = `tel:${phoneNumber}`;
//     window.location.href = telURL;
//   };
//     const openWhatsAppChat = (phoneNumber) => {
//       const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
//       window.open(whatsappURL, '_blank');
//     };
  // ======Calling and Whatsapp Feature End=======
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
           <input type="text" id="User-Name" name="Kilo-meters" />
           <label htmlFor="User-Mobile">Mobile no.</label>
           <input type="text" id="User-Mobile" name="Kilo-meters" />
           {/* <p><span>ProductAfId: </span>{affiliationId}</p> */}
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
     {/* <div style={{ marginBottom: '3vh' }} className='car-details-multibtn-div disp-car-extra-class'>
       <div className='multi-phone-combining-div'>
         <div onClick={() => initiatePhoneCall('9039065247')}
          className={phoneToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Call</div>
         <button
           onMouseEnter={() => setPhonneToolTip(true)}
           onMouseLeave={() => setPhonneToolTip(false)}
           className='car-details-multi-btn multi-button-phone'>
           <i style={{ fontSize: '1.4rem' }} className="fa-solid fa-phone multi-btn-phone"></i>
         </button>
       </div>
       <div className='multi-whatsapp-combining-div'>
         <div onClick={() => openWhatsAppChat('9039065247')}
          className={whatsappToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Whatsapp</div>
         <button
           onMouseEnter={() => setWhatsappToolTip(true)}
           onMouseLeave={() => setWhatsappToolTip(false)}
           className='car-details-multi-btn multi-button-whatsapp'><i style={{ fontSize: '1.5rem' }} className="fa-brands fa-whatsapp multi-btn-whatsapp"></i></button>
       </div>
       <div className='multi-Enquiry-combining-div'>
         <div className={enquiryToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Enquiry</div>
         <button
           onMouseEnter={() => setEnquiryToolTip(true)}
           onMouseLeave={() => setEnquiryToolTip(false)}
           onClick={() => setEnqEnable(true)}
           className='car-details-multi-btn multi-button-enquiry'><i style={{ fontSize: '1.5rem' }} className="fa-regular fa-envelope multi-btn-enquiry"></i></button>
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
       <p><span>Description: </span>{dataOfShowingAdd.description}</p>
       </>

     ):
         <h6>Loading</h6>
     }

   </div>
   
 </div>
  )
}

export default ProductDetailsOnlyView