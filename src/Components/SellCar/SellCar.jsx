


import React, { useEffect, useRef, useState } from 'react'
import './sellcarStyle.css'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from '../../apiconfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellCar = () => {

  const SellNavigate = useNavigate()

  const userToken = localStorage.getItem('car-relation-user-token')
  const [selectedImages, setSelectedImages] = useState([]);
  const [showSelectedImages, setShowSelectedImages] = useState([]);
  const [waitWhileUploading, setWaitWhileUploading] = useState(false);
  // console.log(selectedImages, 'Images Details')
  // console.log(showSelectedImages, 'Mapped Images Details')
  const [carCompanyData, setCarCompanyData] = useState([]);
  const [carModelData, setCarModelData] = useState([]);



  const [proceedToConfirmaion, setProceedToConfirmation] = useState(false);
  const [carCompanySelectData, setCarCompanySelectData] = useState(2);
  const [carModelSelectData, setCarModelSelectData] = useState(2);

  const sendCompanyId = carCompanySelectData?carCompanySelectData:2
  const inputRef = useRef(null);


  // =========Car State Data =============
  const [mfgYear, setMfgYear] = useState("")
  const [kmDriven, setKmDriven] = useState("")
  const [description, setDescription] = useState("")
  const [ownerSerial, setOwnerSerial] = useState("1")
  const [saleValue, setSaleValue] = useState("")
  const [Insurance, setInsurance] = useState("1")
  const [createdBy, setCreatedBy] = useState("")


  // eslint-disable-next-line
  const showCompanyData =carCompanyData&&carCompanyData.find((items)=>items.id == carCompanySelectData)
  // eslint-disable-next-line
  const showModelData =carModelData&&carModelData.find((items)=>items.id == carModelSelectData)
  // console.log(showCompanyData, 'filteredCompany Data')
  // console.log(carModelSelectData,'Model Select data')
  // console.log(showModelData&&showModelData.model)
  // console.log(carCompanySelectData,'CarCompanySelectData')


  // ========= =============
  // console.log(carCompanySelectData, 'carCompanySelectData')
  // console.log(carModelSelectData, 'carModelSelectData')
  // console.log(mfgYear,'mfgYear')
  // console.log(kmDriven, 'kmDriven')
  // console.log(description, 'description')
  // console.log(ownerSerial, 'ownerSerial')
  // console.log(saleValue, 'saleValue')
  // console.log(Insurance, 'Insurance')
  // console.log(createdBy, 'createdBy')
  // console.log(carModelSelectData, 'carModelSelectData')
  const handleClickOnImagediv = () => {
    inputRef.current.click()
  }

  const handleProceedToSell = () => {
    if (kmDriven && description && saleValue && createdBy !== "" && selectedImages.length > 0) {
    setProceedToConfirmation(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  }
  else {
    toast.error("Please Fill All The Details");
  }
}


  // ======For Uploading Images======

  const handleFileChange = (event) => {
    const files = event.target.files;
    
    if (files.length > 5) {
      // Display an error message or take any other action
      alert("You can only upload up to 5 images.");
      return;
    } else {
      setSelectedImages(files);
  
      const showSelectedImagesArray = [];
      for (let i = 0; i < files.length; i++) {
        const imageUrl = URL.createObjectURL(files[i]);
        showSelectedImagesArray.push(imageUrl);
      }
      setShowSelectedImages(showSelectedImagesArray);
    }
  };
  
  
  // ==============



  // ====== For Posting Add =============

  const UploadApp = async () => {
    if (kmDriven && description && saleValue && createdBy !== "" && selectedImages.length > 0) {
      setWaitWhileUploading(true)
      try {
        const formData = new FormData();
        formData.append("make", carCompanySelectData);
        formData.append("model", carModelSelectData);
        formData.append("mfg_year", mfgYear);
        formData.append("km_driven", kmDriven);
        formData.append("description", description);
        formData.append("owner", ownerSerial);
        formData.append("sale_value", saleValue);
        formData.append("insurance", Insurance);
        formData.append("created_by", createdBy);
        //it is Appending each image to the form data
        for(let i =0; i<selectedImages.length;i++){
          formData.append(`pic[${i}]` ,selectedImages[i])
        }
  
        const response = await fetch(`${BaseUrl}/car/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        });
  
        const carCreate = await response.json();
  
        if (response.ok) {
          // Car Upload Success
          toast.success(carCreate.message);
          console.log(carCreate);
          
          SellNavigate('/');
        } else {
          // car Upload failed
          toast.error(carCreate.message);
          console.log(carCreate);
        }
      } catch (error) {
        setWaitWhileUploading(false)
        console.error("Error during Upload:", error);
        toast.error("An error occurred during Upload.");
      }
    } else {
      toast.error("Please Fill All The Details");
    }
  };
  

// ==================


  


// For Fetching Car Company
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/carmakers`, {
          mode:'no-cors',
          headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${userToken}`
          },
        });
  
        if (response.status >= 200 && response.status < 300) {
          const Companydata = response.data;
          if(Companydata){
            setCarCompanyData(Companydata.data)
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    // eslint-disable-next-line
  }, []);
  // console.log(carCompanyData, 'Fetched Compay Data')
  // console.log(carModelData, 'Fetched Model Data')




  // For Fetching Car Model
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/carmodels/${sendCompanyId}`, {
          mode:'no-cors',
          headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${userToken}`
          },
        });
  
        if (response.status >= 200 && response.status < 300) {
          const Modeldata = response.data;
          if(Modeldata){
            setCarModelData(Modeldata.data)
            setCarModelSelectData(Modeldata.data[0].id)
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    // eslint-disable-next-line
  }, [carCompanySelectData]);


  // useEffect(()=>{
  //   console.log(carCompanyData)
  // },[carCompanyData])

  // console.log(carCompanySelectData)
  return (
    <div className='SellCar-main-div'>
      
      {/* =========Uploading Add Wait Div ========= */}
      <div className={waitWhileUploading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Uploading...</h4>
      </div>
      {/* ================= */}


      {/* =========Show Upload Data  ======= */}
      <div className={proceedToConfirmaion?'SellCar-Show-data-to-Upload':'SellCar-Show-data-to-Upload-False'}>
      <div className='SellCar-sub-div'>
        <div className='SellCar-top-heading'>
          <h1>Upload Confirmation</h1>
        </div>

        <div className='Sell-car-main-content'>
          <div className='Sell-car-image-upload'>
            <div onClick={handleClickOnImagediv} className='show-uploaded-image'>
            {showSelectedImages && showSelectedImages.length > 0 ? showSelectedImages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`uploaded-${index}`} />
            )) : <h3 className='substitute-image-text'>Images</h3>}

              {/* <h3 className='substitute-image-text'>Add Images here</h3> */}
            </div>
          </div>
          <div className='Sell-car-details-fill'>
            <div className='Sell-car-details-fill-main-div'>
              <h6>Company</h6>
              <p>{showCompanyData&&showCompanyData.make}</p>

              <h6>Car Model</h6>
              <p>{showModelData ? `${showModelData.make} ${showModelData.model}` : 'Not available'}</p>


              <h6>Mfg Year</h6>
              <p>{mfgYear}</p>

              <h6>KM Driven</h6>
              <p>{kmDriven}</p>

              <div className='description-text-area-div'>
              <h6>Description</h6>
              <p>{description}</p>
              </div>


              <h6>Owner Serial</h6>
              <p>{ownerSerial}</p>

              <h6>Sale Value INR</h6>
              <p>{saleValue}</p>

              <h6>Insurance</h6>
              <p>{Insurance===1?"Yes":"No"}</p>

              <h6>Created By</h6>
              <p>{createdBy}</p>
            </div>
            <div className='Upload-btn'>
              {/* <button onClick={UploadApp} className='Add-Upload-button'>Confirm</button> */}
              <button onClick={UploadApp} className='Add-Upload-button Add-Upload-button-confirm'>Confirm</button>
              <button onClick={()=>setProceedToConfirmation(false)} className='Add-Upload-button Add-Upload-button-Edit'>Edit</button>
            </div>
          </div>
        </div>
      </div>



      </div>


      <div className='SellCar-sub-div'>
        <div className='SellCar-top-heading'>
          <h1>Upload Your Car Details</h1>
        </div>

        <div className='Sell-car-main-content'>
          <div className='Sell-car-image-upload'>
            <div onClick={handleClickOnImagediv} className='show-uploaded-image'>
            {showSelectedImages && showSelectedImages.length > 0 ? showSelectedImages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`uploaded-${index}`} />
            )) : <h3 className='substitute-image-text'>Add Images here</h3>}

              {/* <h3 className='substitute-image-text'>Add Images here</h3> */}
            </div>
            <input type="file" placeholder='image' multiple onChange={handleFileChange} ref={inputRef} />
          </div>
          <div className='Sell-car-details-fill'>
            <div className='Sell-car-details-fill-main-div'>
              <label htmlFor="car-Company">Company</label>
              <select onChange={(e)=>setCarCompanySelectData(e.target.value)} id="car-company"
              // value={selectedValue} onChange={handleDropdownChange}
              >
                {carCompanyData.map((items)=>(
                  <React.Fragment key={items.id}>
                <option value={items.id}>{items.make}</option>
                </React.Fragment>
                ))}
              </select>

              <label htmlFor="Car-Model">Car Model</label>
              <select onChange={(e)=>setCarModelSelectData(e.target.value)}  id="Car-Model" >
              {carModelData.map((items)=>(
                  <React.Fragment key={items.id}>
                <option  key={items.id} value={items.id}>{items.make} {items.model}</option>
                </React.Fragment>
                ))}
              </select>


              <label htmlFor="year">Mfg Year</label>
              {/* <select onChange={(e)=>setMfgYear(e.target.value)}  id="year" >
              <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select> */}
              <input onChange={(e)=>setMfgYear(e.target.value)} type="number" name='year' />

              <label htmlFor="Kilo-meters">KM Driven</label>
              <input onChange={(e)=>setKmDriven(e.target.value)} type="number" id="Kilo-meters" name="Kilo-meters" />

              <div className='description-text-area-div'>
              <label  htmlFor="description">Description</label>
              <textarea onChange={(e)=>setDescription(e.target.value)} className='description-text-area' id="description" cols="auto" rows="auto"></textarea>
              </div>


              <label htmlFor="Owner">Owner Sr</label>
              <select onChange={(e)=>setOwnerSerial(e.target.value)}  id="Owner" >
              <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <label htmlFor="Value">Sale Value INR</label>
              <input onChange={(e)=>setSaleValue(e.target.value)} type="number" id="Value" name="Value" />

              <label htmlFor="Insurance">Insurance</label>
              <select onChange={(e)=>setInsurance(e.target.value)}  id="Insurance" >
              <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              <label htmlFor="CreatedBy">Created By</label>
              <input onChange={(e)=>setCreatedBy(e.target.value)} type="text" id="Kilo-meters" name="CreatedBy" />
            </div>
            <div className='Upload-btn'>
              {/* <button onClick={UploadApp} className='Add-Upload-button'>Proceed To Sell</button> */}
              <button onClick={handleProceedToSell} className='Add-Upload-button'>Proceed To Sell</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default SellCar