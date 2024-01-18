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
  console.log(selectedImages, 'Images Details')
  const [carCompanyData, setCarCompanyData] = useState([]);
  const [carModelData, setCarModelData] = useState([]);



  const [carCompanySelectData, setCarCompanySelectData] = useState(2);
  const [carModelSelectData, setCarModelSelectData] = useState(2);

  const sendCompanyId = carCompanySelectData?carCompanySelectData:2
  const inputRef = useRef(null);


  // =========Car State Data =============
  const [mfgYear, setMfgYear] = useState("2023")
  const [kmDriven, setKmDriven] = useState("")
  const [description, setDescription] = useState("")
  const [ownerSerial, setOwnerSerial] = useState("1")
  const [saleValue, setSaleValue] = useState("")
  const [Insurance, setInsurance] = useState("1")
  const [createdBy, setCreatedBy] = useState("")
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


  // ======For Uploading Images======

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedImagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      selectedImagesArray.push(imageUrl);
    }
    setSelectedImages(selectedImagesArray);
  };
  // ==============



  // ====== For Posting Add =============
  const UploadApp = async () => {
    if (kmDriven&&description&&saleValue&&createdBy !== "" &&selectedImages.length>0) {
      try {
        const response = await fetch(`${BaseUrl}/car/create`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${userToken}`,
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            make: carCompanySelectData,
            model: carModelSelectData,
            mfg_year: mfgYear,
            km_driven: kmDriven,
            description: description,
            owner: ownerSerial,
            sale_value: saleValue,
            insurance: Insurance,
            created_by: createdBy,
            pic:selectedImages
          })
        });
  
        const carCreate = await response.json();
  
        if (response.ok) {
          // Car Upload Success
          toast.success(carCreate.message);
          console.log(carCreate)
          SellNavigate('/')
          
        } else {
          // car Upload failed
          toast.error(carCreate.message);
          console.log(carCreate);
        }
  
      } catch (error) {
        console.error("Error during Upload:", error);
        toast.error("An error occurred during Upload.");
      }
    }
    else{
      toast.error("Please Fill All The Details");
    }
    
  }

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


  // useEffect(()=>{
  //   console.log(carCompanyData)
  // },[carCompanyData])

  // console.log(carCompanySelectData)
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
              <select onChange={(e)=>setMfgYear(e.target.value)}  id="year" >
              <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>

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