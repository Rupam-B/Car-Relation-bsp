import React from 'react'
import './DispCarStyle.css'
import { useSelector } from 'react-redux'

const DispCarDetails = () => {

    const imageDispaly = useSelector((state)=>state.imageAdder.src)
    console.log(imageDispaly)
    
  return (
    <div className='DisplayCar-Main-div'>
        <div className='DisplayCar-Sub-div'>
            <div className='Display-car-main-img-div'>
                <img src={imageDispaly} alt="" />
            </div>
            <div className='Display-car-Extended-img-div'>
                <img src={imageDispaly} alt="" />
                <img src={imageDispaly} alt="" />
                <img src={imageDispaly} alt="" />
                <img src={imageDispaly} alt="" />
                <img src={imageDispaly} alt="" />
               
            </div>
            <div className='Car-EnquiryForm-div'>
                <h3>Enquire Now</h3>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Mobile No.'/>
                <button className='Enquiry-Submit-btn'>Submit</button>
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
        </div>
    </div>
  )
}

export default DispCarDetails