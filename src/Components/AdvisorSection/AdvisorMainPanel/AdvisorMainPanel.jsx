import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdvisorMainPanel = () => {

    const [isPersonalEdit, setIsPersonalEdit]= useState(false)
    
  const handleEditInfo =()=>{
    setIsPersonalEdit(true)
    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: 'smooth',
      });
    }, 100);
  }


    return (
        <div className="Employee-panel-main-div">
          <div className="Employee-panel-sub-div">
            <Link to={"/UserDashboard"}>
              <i className="fa-solid fa-arrow-left back-to-user-dashboard"></i>
            </Link>
            <div className="Employee-panel-Top-Heading">
              <h1>Advisor</h1>
              <div className="Employee-panel-Top-Image-div">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbOTGGFzdWOAb6R1S5vujgZ4zHoQs16CD4yN3vq6U5g&s" alt="" />
              </div>
                <i className="fa-solid fa-camera Advisor-photo-change"></i>
            </div>
    
            <hr style={{width:'90%', margin:'auto',marginTop:'8vh',marginBottom:'5vh'}} />
    
            <div className="Employee-panel-salary-section-div">
            <Link to={'/AdvisorDocumentSection'} className="Employee-panel-salary-div"><h6>Document</h6></Link>
              <Link to={'/AdvisorIncentiveSection'} className="Employee-panel-salary-div"><h6>Incentives</h6></Link>
            </div>
    
    
            {/* <hr style={{width:'90%', margin:'auto',marginTop:'8vh'}} /> */}
    
    
            <div className="Employee-panel-Personal-section-div">
            <i onClick={handleEditInfo} className="fa-regular fa-pen-to-square Employee-panel-Personal-section-Edit-icon"></i>
            <p><span>First Name </span>Gaurav<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Last Name </span>Chowdhary<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>D.O.B </span>1 Dec 1997<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Address </span>Car Relation , in front of AU small Bank, Vyapar Vihar, Bilaspur C G<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>
            <p><span>Phone (Personal) </span>9876543210<b style={{width:'17vw', backgroundColor:'white', paddingLeft:'2vw'}} className='profile-input-optional'></b></p>              
            </div>
    
    
    
    
            
            <div className={isPersonalEdit?"Employee-panel-Personal-section-Edit-div":'Employee-panel-Personal-section-Edit-div-false'}>
            <i onClick={()=>setIsPersonalEdit(false)} className="fa-solid fa-xmark Employee-panel-Personal-section-Edit-div-icon"></i>
    
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName"/>
            <label htmlFor="LastName">Last Name</label>
            <input type="text" name="LastName" id="LastName" />
            <label htmlFor="DOB">D.O.B</label>
            <input type="text" name="DOB" id="DOB" />
            <label htmlFor="address">Address</label>
            <textarea name="address" id="address" cols="30" rows="10"></textarea>
            <label htmlFor="phonePersonal">Phone </label>
            <input type="tel" name="phonePersonal" id="phonePersonal"/>
            <div className="Employee-panel-Personal-section-Edit-div-button">
            <button>Save</button>
            </div>
            
            </div>
          </div>
        </div>
      );
}

export default AdvisorMainPanel