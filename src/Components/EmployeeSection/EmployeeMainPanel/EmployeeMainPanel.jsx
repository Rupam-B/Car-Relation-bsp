import React, { useEffect, useState } from "react";
import "./EmployeeMainPanelStyle.css";
import { Link } from "react-router-dom";

const EmployeeMainPanel = () => {
    const [resizingAttButton, setResizingAttButton]= useState(false)


    useEffect(()=>{
        setTimeout(()=>{
            setResizingAttButton(!resizingAttButton)
        },1000)
    },[resizingAttButton])
  return (
    <div className="Employee-panel-main-div">
      <div className="Employee-panel-sub-div">
        <Link to={"/UserDashboard"}>
          <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
        </Link>
        <div className="Employee-panel-Top-Heading">
          <h1>Gaurav</h1>
          <div className="Employee-panel-Top-Image-div">
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" alt="" />
          </div>
        </div>
        <div className="Employee-panel-attendance-button-div">
          <button className={resizingAttButton?'Employee-panel-attendance-button-small':'Employee-panel-attendance-button-large'}><i className="fa-regular fa-hand-pointer"></i></button>
          <p>click to submit attendance</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMainPanel;
