import React, { useRef, useState } from 'react'
import './sellcarStyle.css'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellCar = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      selectedImagesArray.push(imageUrl);
    }

    setSelectedImages(selectedImagesArray);

  };
  const UploadApp = () => {
    toast.success('You App is Under Process, Will be Uploaded after verification', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const handleClickOnImagediv = () => {
    inputRef.current.click()
  }
  return (
    <div className='SellCar-main-div'>
      <div className='SellCar-sub-div'>
        <div className='SellCar-top-heading'>
          <h1>Enter Car Details</h1>
        </div>

        <div className='Sell-car-main-content'>
          <div className='Sell-car-image-upload'>
            <div onClick={handleClickOnImagediv} className='show-uploaded-image'>
              {selectedImages.length > 0 ? selectedImages.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`uploaded-${index}`} />
              )) : <h3 className='substitute-image-text'>Add Images here</h3>}
            </div>
            <input type="file" placeholder='image' multiple onChange={handleFileChange} ref={inputRef} />
          </div>
          <div className='Sell-car-details-fill'>
            <div className='Sell-car-details-fill-main-div'>
              <label htmlFor="car-Company">Company</label>
              <select id="car-company"
              // value={selectedValue} onChange={handleDropdownChange}
              >
                <option value="">Toyota</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>

              <label htmlFor="Car-Model">Car Model</label>
              <select  id="Car-Model" >
              <option value="">XUV</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>


              <label htmlFor="year">Mfg Year</label>
              <select  id="year" >
              <option value="">2023</option>
                <option value="option1">2022</option>
                <option value="option2">2021</option>
                <option value="option3">2020</option>
              </select>

              <label htmlFor="Kilo-meters">KM Driven</label>
              <input type="text" id="Kilo-meters" name="Kilo-meters" />

              <div className='description-text-area-div'>
              <label  htmlFor="description">Description</label>
              <textarea className='description-text-area' id="description" cols="auto" rows="auto"></textarea>
              </div>


              <label htmlFor="Owner">Owner Sr</label>
              <select  id="Owner" >
              <option value="">1</option>
                <option value="option1">2</option>
                <option value="option2">3</option>
              </select>

              <label htmlFor="Value">Sale Value INR</label>
              <input type="number" id="Value" name="Value" />

              <label htmlFor="Insurance">Insurance</label>
              <select  id="Insurance" >
              <option value="">Yes</option>
                <option value="option1">No</option>
              </select>
            </div>
            <div className='Upload-btn'>
              <button onClick={UploadApp} className='Add-Upload-button'>Proceed To Sell</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SellCar