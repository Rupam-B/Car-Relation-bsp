import React, { useEffect, useState } from 'react'
import './DispCarStyle.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circle } from 'rc-progress';
import BaseURL from '../../apiconfig';
import axios from 'axios';


const DispCarDetails = () => {
  const gwtExtendesAddDispalyId = useSelector((state) => state.TargetingWhichAddToDisplay)
  if(gwtExtendesAddDispalyId){
  localStorage.setItem('car-relation-Add-showing-Id', JSON.stringify(gwtExtendesAddDispalyId))
  }
  const extractExtendesAddDispalyId = localStorage.getItem('car-relation-Add-showing-Id')
  const ExtendesAddDispalyId = parseInt(extractExtendesAddDispalyId)
  // console.log(ExtendesAddDispalyId)


  const [apiData, setApiData] = useState([]);
  const dataOfShowingAdd = apiData.data&& apiData.data.find(items=>items.id===ExtendesAddDispalyId)
  console.log(dataOfShowingAdd, 'Data of showing add')

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

  // ======Fetch All Adds Data ========

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/cars`, {
          method:'GET',
          headers: {
            Accept: 'application/json',
          },
        });
  
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if(data){
            setApiData(data)
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
  }, []);

  // console.log(apiData.data)



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
          <img src={dataOfShowingAdd&&dataOfShowingAdd.image[0]} alt="" />
        </div>
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
        <div className='Display-car-Extended-img-div'>
        {dataOfShowingAdd && dataOfShowingAdd.image.map((items, index) => (
          <React.Fragment key={index}>
            <img src={items} alt="" />
          </React.Fragment>
        ))}

        </div>
        <div style={{ marginBottom: '3vh' }} className='car-details-multibtn-div disp-car-extra-class'>
          <div className='multi-phone-combining-div'>
            <div className={phoneToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Call</div>
            <button
              onMouseEnter={() => setPhonneToolTip(true)}
              onMouseLeave={() => setPhonneToolTip(false)}
              className='car-details-multi-btn multi-button-phone'>
              <i style={{ fontSize: '1.4rem' }} className="fa-solid fa-phone multi-btn-phone"></i>
            </button>
          </div>
          <div className='multi-whatsapp-combining-div'>
            <div className={whatsappToolTip ? 'phone-tooltip' : 'phone-tooltip-inactive'}>Whatsapp</div>
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
        </div>

        {/* ----------------------Disp-Condition-div----------------- */}
        <div className='Disp-car-condition-div border'>
          {/* <div className="row"> */}
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
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* ----------------------********----------------- */}

      <div className='Car-Details-div'>
        <h4 className='Car-Details-to4-heading'>Details</h4>

      </div>
      <div className='Car-OverView-div'>
        <h4 className='Car-Details-top-heading'>OverView</h4>

      </div>
      <div className='Car-Features-div'>
        <h4 className='Car-Details-top-heading'>Features</h4>

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