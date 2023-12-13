import React, { useState } from 'react'
import './FinancePgstyle.css'
import FinanceCompanyImages from './FinanceImgs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Financepage = () => {

  const CompanyDetails = FinanceCompanyImages

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
    <div className='Finance-page-main-div'>
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
              <input type="text" defaultValue="Finance Querry"  id="User-Querry" />
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
        <div className='Finance-page-sub-div'>
            <div className='Finance-company-images-div' >
              {CompanyDetails.map((itam)=>(
                <div className='Finance-company-image-showing-div' tabIndex={0} key={itam.id}>
                  <img src={itam.src} alt="" />

                </div>
              ))}
            </div>
            <div className='Finance-company-input-div' >
              <label className='Finance-company-name-label' htmlFor="Finance-company-options">Select Finance Company :</label>
              <select className='Finance-company-name-select'  id="Finance-company-options">
              <option value="All">All</option>
              {FinanceCompanyImages.map((itemss)=>(
                <option key={itemss.id} value={itemss.name}>{itemss.name}</option>
              ))}
              </select>
              
            </div>

            <div className='car-details-multibtn-div Finance-comp-multi-btn'>
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

            <div className='Finance-Documents-Req-div'>
                <h4>Documents Required</h4>
            </div>
        </div>
    </div>
  )
}

export default Financepage