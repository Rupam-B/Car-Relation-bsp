import React, { useEffect, useState } from "react";
import "./EmployeeMainPanelStyle.css";
import { Link } from "react-router-dom";
import { Geolocation } from "@capacitor/geolocation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeMainPanel = () => {
    const [resizingAttButton, setResizingAttButton]= useState(false)
    const [shouldBlink, setShouldBlink]= useState(true)
    const [isPersonalEdit, setIsPersonalEdit]= useState(false)


    const submitAttendance = async () => {
      try {
          const position = await Geolocation.getCurrentPosition();
          const { latitude, longitude } = position.coords;
          const timestamp = new Date().toISOString();

          const date = new Date(timestamp);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

          console.log('Location:', { latitude, longitude, formattedDate, formattedTime });
          setShouldBlink(false)
          toast.success(`Attendance Succesfull on ${formattedDate}`)

          // setAttendanceDetails({
          //     latitude,
          //     longitude,
          //     date: formattedDate,
          //     time: formattedTime,
          // });
      } catch (error) {
          console.error('Error getting location:', error);
      }
  };

  const handleEditInfo =()=>{
    setIsPersonalEdit(true)
    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: 'smooth',
      });
    }, 100);
  }

  



    useEffect(()=>{
      if(shouldBlink){
        setTimeout(()=>{
          setResizingAttButton(!resizingAttButton)
      },1000)
      }   
    },[resizingAttButton,shouldBlink])
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
        <button
          disabled={!shouldBlink}
          onClick={submitAttendance}
          className={shouldBlink? resizingAttButton? 'Employee-panel-attendance-button-small': 'Employee-panel-attendance-button-large'
          : 'Employee-panel-attendance-button-deactive'}
>
  <i className={shouldBlink?"fa-regular fa-hand-pointer fa-hand-pointer-active":'fa-regular fa-hand-pointer fa-hand-pointer-inactive'}></i>
</button>
          <p>click to submit attendance</p>
        </div>

        <hr style={{width:'90%', margin:'auto'}} />

        <div className="Employee-panel-salary-section-div">
        <div className="Employee-panel-salary-div"><h6>Salary</h6></div>
          <div className="Employee-panel-salary-div"><h6>Attendance</h6></div>
        </div>
        <div style={{marginBottom:'5vh'}} className="Employee-panel-salary-section-div">
        <div className="Employee-panel-salary-div"><h6>Documents</h6></div>
          <div className="Employee-panel-salary-div"><h6>Bank Details</h6></div>
        </div>


        <hr style={{width:'90%', margin:'auto'}} />


        <div className="Employee-panel-Personal-section-div">
        <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
        <p><span>First Name </span>Gaurav<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Last Name </span>Chowdhary<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Father's Name </span>Deenanath Chowdhary<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>D.O.B </span>1 Dec 1997<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Address </span>Car Relation , in front of AU small Bank, Vyapar Vihar, Bilaspur C G<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Phone (Personal) </span>9876543210<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
        <p><span>Phone (Home) </span>9876543210<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
          
        </div>




        
        <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
        <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>

        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName"/>
        <label htmlFor="LastName">Last Name</label>
        <input type="text" name="LastName" id="LastName" />
        <label htmlFor="fatherName">Father's Name</label>
        <input type="text" name="fatherName" id="fatherName" />
        <label htmlFor="DOB">D.O.B</label>
        <input type="text" name="DOB" id="DOB" />
        <label htmlFor="address">Address</label>
        <textarea name="address" id="address" cols="30" rows="10"></textarea>
        <label htmlFor="phonePersonal">Phone (Personal)</label>
        <input type="tel" name="phonePersonal" id="phonePersonal"/>
        <label htmlFor="phoneHome">Phone (Home)</label>
        <input type="tel" name="phoneHome" id="phoneHome"/>
        <div className="Employee-panel-Personal-section-Edit-div-button">
        <button>Save</button>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default EmployeeMainPanel;
