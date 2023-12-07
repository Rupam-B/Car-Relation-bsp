import React, { useState } from 'react'
import './sellcarStyle.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellCar = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      selectedImagesArray.push(imageUrl);
    }

    setSelectedImages(selectedImagesArray);

  };
  const UploadAdd = () => {
    toast.success('You App is Under Process, Will be Uploaded after verification',{
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div className='SellCar-main-div'>
      <div className='SellCar-sub-div'>
        <div className='SellCar-top-heading'>
          <h1>Enter Car Details</h1>
          <div className='buy-sell-btn'>
            <Link to={'/SellCarPortal'} className='buy-sell-btn-one'>Sell</Link>
            <Link to={'/'} className='buy-sell-btn-two'>Buy</Link>
          </div>
        </div>

        <div className='Sell-car-main-content'>
          <div className='Sell-car-image-upload'>
            <div className='show-uploaded-image'>
              {selectedImages.length > 0 ? selectedImages.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`uploaded-${index}`} />
              )) : <h3 className='substitute-image-text'>Add Images here</h3>}
            </div>
            <input type="file" placeholder='image' multiple onChange={handleFileChange} />
          </div>
          <div className='Sell-car-details-fill'>
            <div className='Sell-car-details-fill-main-div'>
              <label htmlFor="Car-Model">Car Model</label>
              <input type="text" id="Car-Model" name="Car-Model" />

              <label htmlFor="year">Mfg Year</label>
              <input type="number" id="year" name="year" />

              <label htmlFor="Kilo-meters">KM Driven</label>
              <input type="text" id="Kilo-meters" name="Kilo-meters" />

              <label htmlFor="description">Description</label>
              <input type="text" id="description" name="description" />

              <label htmlFor="Owner">Owner Sr</label>
              <input type="text" id="Owner" name="Owner" />

              <label htmlFor="Value">Value</label>
              <input type="text" id="Value" name="Value" />

              <label htmlFor="Insurance">Insurance</label>
              <input type="text" id="Insurance" name="Insurance" />
            </div>
            <button onClick={UploadAdd} className='Add-Upload-button'>Upload Add</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SellCar