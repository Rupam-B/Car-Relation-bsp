import React, { useState } from 'react'
import './DispCarStyle.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DispCarDetails = () => {

    const imageDispaly = useSelector((state)=>state.imageAdder)

    const [phoneToolTip,setPhonneToolTip] = useState(false)
  const [whatsappToolTip,setWhatsappToolTip] = useState(false)
  const [enquiryToolTip,setEnquiryToolTip] = useState(false)

  const [enqEnable,setEnqEnable] = useState(false)

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
 

    
  return (
    <div className='DisplayCar-Main-div'>
        <div className='DisplayCar-Sub-div'>
            <div className='Display-car-main-img-div'>
                <img src={imageDispaly.src} alt="" />
            </div>
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
              <input type="text" defaultValue={imageDispaly.title}  id="User-Querry" />
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
            <div className='Display-car-Extended-img-div'>
                <img src={imageDispaly.src} alt="" />
                <img src={imageDispaly.src} alt="" />
                <img src={imageDispaly.src} alt="" />
                <img src={imageDispaly.src} alt="" />
                <img src={imageDispaly.src} alt="" />
               
            </div>
            <div style={{marginBottom:'3vh'}} className='car-details-multibtn-div disp-car-extra-class'>
                <div className='multi-phone-combining-div'>
                <div className={phoneToolTip?'phone-tooltip':'phone-tooltip-inactive'}>Call</div>
                <button 
                onMouseEnter={()=>setPhonneToolTip(true)} 
                onMouseLeave={()=>setPhonneToolTip(false)} 
                className='car-details-multi-btn multi-button-phone'>
                  <i style={{fontSize:'1.4rem'}} className="fa-solid fa-phone multi-btn-phone"></i>
                  </button>
                </div>
                <div className='multi-whatsapp-combining-div'>
                <div className={whatsappToolTip?'phone-tooltip':'phone-tooltip-inactive'}>Whatsapp</div>
                <button
                 onMouseEnter={()=>setWhatsappToolTip(true)} 
                 onMouseLeave={()=>setWhatsappToolTip(false)} 
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
            
            <div className='Car-Details-div'>
                <h4 className='Car-Details-top-heading'>Details</h4>

            </div>
            <div className='Car-OverView-div'>
                <h4 className='Car-Details-top-heading'>OverView</h4>

            </div>
            <div className='Car-Features-div'>
                <h4 className='Car-Details-top-heading'>Features</h4>

            </div>
            <div className='Car-EnquiryForm-div'>
                <h3>Enquire Now</h3>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Mobile No.'/>
                <input type="text" placeholder='Querry'/>
                <button className='Enquiry-Submit-btn'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default DispCarDetails