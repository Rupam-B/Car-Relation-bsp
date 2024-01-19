import React, { useEffect, useRef, useState } from "react";
import "./UserCarListStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseURL from "../../../apiconfig";

const UserCarList = () => {
  const userToken = localStorage.getItem("car-relation-user-token");

  const [userStoredAdds, setUserStoredAdds] = useState([]);
  //   console.log(userStoredAdds)
  const [updatingAdd, setUpdatingAdd] = useState(false);
  const [deletingAdd, setDeletingAdd] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [waitWhileUploading, setWaitWhileUploading] = useState(false);
  const [showSelectedImages, setShowSelectedImages] = useState([]);
  const [carCompanyData, setCarCompanyData] = useState([]);
  const [carModelData, setCarModelData] = useState([]);

  const [carCompanySelectData, setCarCompanySelectData] = useState(2);
  const [carModelSelectData, setCarModelSelectData] = useState(2);

  const sendCompanyId = carCompanySelectData ? carCompanySelectData : 2;
  const inputRef = useRef(null);

  // =========Car State Data =============
  const [addDeletingId, setAddDeletingId] = useState(0);
  const [updatingId, setUpdatingId] = useState(0);
  const [mfgYear, setMfgYear] = useState("2023");
  const [kmDriven, setKmDriven] = useState("");
  const [description, setDescription] = useState("");
  const [ownerSerial, setOwnerSerial] = useState("1");
  const [saleValue, setSaleValue] = useState("");
  const [Insurance, setInsurance] = useState("1");
  const [createdBy, setCreatedBy] = useState("");

  const UpdateButtonFunction = (id) => {
    setUpdatingAdd(true);
    setUpdatingId(id);
    // console.log(id, 'items id')
  };
  const DeleteButtonFunction = (id) => {
    setDeletingAdd(true);
    setAddDeletingId(id);
    // console.log(id, 'items id')
  };

  //   ====== Update Add =============
  const UpdateAdd = async () => {
    if (kmDriven &&description &&saleValue &&createdBy !== "" &&selectedImages.length > 0) {
      setWaitWhileUploading(true)
      console.log(waitWhileUploading)
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
        const response = await fetch(`${BaseURL}/car/update/${updatingId}`, {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        });

        const carUpdate = await response.json();

        if (response.ok) {
          // Car Upload Success
          toast.success(carUpdate.message);
          console.log(carUpdate);
          setUpdatingAdd(false);
          window.location.assign('/UserCarList')
        } else {
          // car Upload failed
          toast.error(carUpdate.message);
          console.log(carUpdate);
          setWaitWhileUploading(false)
        }
      } catch (error) {
        console.error("Error during Upload:", error);
        toast.error("An error occurred during Upload.");
      }
    } else {
      toast.error("Please Fill All The Details");
    }
  };

  //   ====== Delete Add =============
  const DeleteAdd = async () => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this add?"
    );

    if (userConfirmation) {
      try {
        const response = await fetch(`${BaseURL}/car/delete/${addDeletingId}`, {
          mode: "cors",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        const carDelete = await response.json();

        if (response.ok) {
          // Car Delete Success
          toast.success(carDelete.message);
          console.log(carDelete);
          window.location.assign("/UserCarList");
        } else {
          // Car Delete failed
          toast.error(carDelete.message); // Fix here
          console.log(carDelete);
        }
      } catch (error) {
        console.error("Error during Delete:", error);
        toast.error("An error occurred during Delete.");
      }
    }
  };

  const handleClickOnImagediv = () => {
    inputRef.current.click();
  };
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

  // For Fetching Car Company
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/carmakers`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const Companydata = response.data;
          if (Companydata) {
            setCarCompanyData(Companydata.data);
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // For Fetching Car Model
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/carmodels/${sendCompanyId}`,
          {
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          const Modeldata = response.data;
          if (Modeldata) {
            setCarModelData(Modeldata.data);
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // For Fetching User Added Car List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/usercars`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
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
  }, [userToken]);

  return (
    <div className="User-Affliation-main-div">

      {/* =========Updating Add Wait Div ========= */}
      <div className={waitWhileUploading?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
      {/* <div className='SellCar-main-wait-while-uploading-di-true'> */}
          <h4>Updating...</h4>
      </div>
      {/* ================= */}

      {/* ======= Delete Add Div ========= */}
      <div
        className={
          deletingAdd
            ? "User-Affliation-Delete-user-add-div-show"
            : "User-Affliation-Delete-user-add-div-hide"
        }
      >
        <div className="User-Affliation-Delete-user-add-div-show-innerDiv">
          <p>Are you sure you want to delete this add?</p>
          <div className="User-Affliation-Delete-user-add-div-show-innerDiv-buttons">
            <button onClick={DeleteAdd} style={{ border: "1px solid red" }}>
              Delete
            </button>
            <button
              onClick={() => setDeletingAdd(false)}
              style={{ border: "1px solid blue" }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
      {/* ======== */}



      {/* ======= Update Add Div ========= */}
      <div
        className={
          updatingAdd
            ? "User-Affliation-Update-user-add-div-show"
            : "User-Affliation-Update-user-add-div-Hide"
        }
      >
        <i
          onClick={() => setUpdatingAdd(false)}
          className="fa-solid fa-xmark User-Affliation-Update-user-add-div-closeMark"
        ></i>
        <div className="Sell-car-main-content">
          <div className="Sell-car-image-upload">
            <div
              onClick={handleClickOnImagediv}
              className="show-uploaded-image"
            >
              {showSelectedImages.length > 0 ? (
                showSelectedImages.map((imageUrl, index) => (
                  <React.Fragment key={index}>
                  <img  src={imageUrl} alt={`uploaded-${index}`} />
                  </React.Fragment>
                ))
              ) : (
                <h3 className="substitute-image-text">Add Images here</h3>
              )}
            </div>
            <input
              type="file"
              placeholder="image"
              multiple
              onChange={handleFileChange}
              ref={inputRef}
            />
          </div>
          <div className="Sell-car-details-fill">
            <div className="Sell-car-details-fill-main-div">
              <label htmlFor="car-Company">Company</label>
              <select
                onChange={(e) => setCarCompanySelectData(e.target.value)}
                id="car-company"
                // value={selectedValue} onChange={handleDropdownChange}
              >
                {carCompanyData.map((items) => (
                  <React.Fragment key={items.id}>
                    <option value={items.id}>{items.make}</option>
                  </React.Fragment>
                ))}
              </select>

              <label htmlFor="Car-Model">Car Model</label>
              <select
                onChange={(e) => setCarModelSelectData(e.target.value)}
                id="Car-Model"
              >
                {carModelData.map((items) => (
                  <React.Fragment key={items.id}>
                    <option value={items.id}>
                      {items.make} {items.model}
                    </option>
                  </React.Fragment>
                ))}
              </select>

              <label htmlFor="year">Mfg Year</label>
              <select onChange={(e) => setMfgYear(e.target.value)} id="year">
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>

              <label htmlFor="Kilo-meters">KM Driven</label>
              <input
                onChange={(e) => setKmDriven(e.target.value)}
                type="number"
                id="Kilo-meters"
                name="Kilo-meters"
              />

              <div className="description-text-area-div">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="description-text-area"
                  id="description"
                  cols="auto"
                  rows="auto"
                ></textarea>
              </div>

              <label htmlFor="Owner">Owner Sr</label>
              <select
                onChange={(e) => setOwnerSerial(e.target.value)}
                id="Owner"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <label htmlFor="Value">Sale Value INR</label>
              <input
                onChange={(e) => setSaleValue(e.target.value)}
                type="number"
                id="Value"
                name="Value"
              />

              <label htmlFor="Insurance">Insurance</label>
              <select
                onChange={(e) => setInsurance(e.target.value)}
                id="Insurance"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              <label htmlFor="CreatedBy">Created By</label>
              <input
                onChange={(e) => setCreatedBy(e.target.value)}
                type="text"
                id="Kilo-meters"
                name="CreatedBy"
              />
            </div>
            <div className="Upload-btn">
              <button onClick={UpdateAdd} className="Add-Upload-button">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ========== */}



        
      <div className="User-Affliation-sub-div">
        <Link to={"/UserDashboard"}>
          <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
        </Link>
        <div className="Affliation-Top-Heading">
          <h1>Your Adds</h1>
        </div>
        <div className="Affliation-top-head-line"></div>
        <div className="User-Adds-List-add-content-sub">
          {userStoredAdds.length > 0 ? (
            userStoredAdds.map((items) => (
              <div key={items.id} className="User-Adds-List-add-showing-div">
                <img src={items.image[0]} alt="" />
                <div className="User-Adds-List-adds-info-div">
                  <h6>
                    {items.description.length > 15
                      ? `${items.description.slice(0, 15)}...`
                      : items.description}
                  </h6>
                  <h6>
                    {items.make} {items.model}
                  </h6>
                  <div className="User-Adds-List-adds-info-div-sub">
                    <p>₹{items.sale_value}</p>
                    {/* <div className='User-Adds-List-share-icon-div'>
                          <i className="fa-solid fa-share User-Adds-List-share-icon"></i>
                          <p className='User-Adds-List-share-quantity'>6</p>
                          </div>
                          <div className='User-Adds-List-Enquiry-icon-div'>
                          <i style={{color:'green'}} className="fa-solid fa-eye"></i>
                          <p className='User-Adds-List-enquiry-quantity'>4</p>
                          </div> */}
                    <button
                      onClick={() => DeleteButtonFunction(items.id)}
                      className="User-Adds-List-adds-info-div-sub-Delete-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => UpdateButtonFunction(items.id)}
                      className="User-Adds-List-adds-info-div-sub-Update-button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6>Loding...</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCarList;
