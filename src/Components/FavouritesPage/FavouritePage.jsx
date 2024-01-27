import React, { useEffect, useState } from "react";
// import "./UserCarListStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseURL from "../../apiconfig";
import { useDispatch } from "react-redux";
import { AddTargetingToDisplay } from "../../Reduxs/action";

const FavouritePage = () => {

    
    const userToken = localStorage.getItem("car-relation-user-token");
    const FavouriteDispatch = useDispatch()
    const FavouriteNavigate = useNavigate()

  const [userStoredAdds, setUserStoredAdds] = useState([]);
  const [waitWhileDeleteing, setWaitWhileDeleteing] = useState(false);
  const [deletingAdd, setDeletingAdd] = useState(false);
  const [addDeletingId, setAddDeletingId] = useState(0);
  // =========Car State Data =============

  const DeleteButtonFunction = (id) => {
    setDeletingAdd(true);
    setAddDeletingId(id);
    // console.log(id, 'items id')
  };
  const ViewButtonFunction = (id) => {
    FavouriteDispatch(AddTargetingToDisplay(id))
    FavouriteNavigate('/DisplayCarDetails')
  };



  //   ====== Delete Add =============
  const DeleteAdd = async () => {
    const userConfirmation = window.confirm(
      "Are you sure you want to Remove this add from Favourite?"
    );

    if (userConfirmation) {
      setWaitWhileDeleteing(true)
      try {
        const response = await fetch(`${BaseURL}/car/favourite-remove/${addDeletingId}`, {
          mode: "cors",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const carDelete = await response.json();

        if (response.ok) {
          // Car Delete Success
          toast.success(carDelete.message);
          console.log(carDelete);
          setDeletingAdd(false);
          setWaitWhileDeleteing(false)
          window.location.assign("/UserFavouritePage");
        } else {
          // Car Delete failed
          toast.error(carDelete.message); // Fix here
          console.log(carDelete);
        }
      } catch (error) {
        console.error("Error during Delete:", error);
        toast.error("An error occurred during Delete.");
        setWaitWhileDeleteing(false)
      }
    }
  };



  // For Fetching User Added Favourite Car List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/car/favourite/list`, {
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

      {/* ================= */}
      {/* =========Deleteing Add Wait Div ========= */}
      <div className={waitWhileDeleteing?'SellCar-main-wait-while-uploading-di-true':'SellCar-main-wait-while-uploading-di-false'}>
          <h4>Removing...</h4>
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
          <p>Are you sure you want to remove this add?</p>
          <div className="User-Affliation-Delete-user-add-div-show-innerDiv-buttons">
            <button onClick={DeleteAdd} style={{ border: "1px solid red" }}>
              Remove
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



        
      <div className="User-Affliation-sub-div">
        <Link to={"/UserDashboard"}>
          <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
        </Link>
        <div className="Affliation-Top-Heading">
          <h1>Favourite Adds</h1>
        </div>
        <div className="Affliation-top-head-line"></div>
        <div className="User-Adds-List-add-content-sub">
          {userStoredAdds.length > 0 ? (
            userStoredAdds.map((items) => (
              <div key={items.id} className="User-Adds-List-add-showing-div">
                <img src={items.image[0]} alt="" />
                <div className="User-Adds-List-adds-info-div">
                  <h6>
                    {items.make.length > 15
                      ? `${items.make.slice(0, 15)}...`
                      : items.make}
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
                      Remove
                    </button>
                    <button
                      onClick={() => ViewButtonFunction(items.id)}
                      className="User-Adds-List-adds-info-div-sub-Update-button"
                    >
                      View
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
  )
}

export default FavouritePage