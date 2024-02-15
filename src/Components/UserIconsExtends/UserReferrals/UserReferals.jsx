import React, { useEffect, useState } from 'react'
import './UserReferalsStyle.css'
import { Link} from 'react-router-dom'
import BaseURL from '../../../apiconfig'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserReferals = () => {

  const userToken = localStorage.getItem("car-relation-user-token");

  const [affilEnquiries,setAffilEnquiries] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${BaseURL}/aflink/enquiries`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if (data) {
            console.log(data.data)
            setAffilEnquiries(data.data);
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error)
      }
      finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, [userToken]);
  return (
    <div className='User-Referrals-main-div'>
      <div className='User-Referrals-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
        <div  className='Referal-Top-Heading'>
        <h1>Your Referrals</h1>
        </div>
        <div className='Referal-top-head-line'></div>
        <div className="Referal-add-content-sub">
          {affilEnquiries.length>0?(
            affilEnquiries.map((items)=>(
              <div key={items.id} className='Referal-add-showing-div' >
                      <img src={items.car_images[0]} alt="" />
                      <div className='Referal-adds-info-div'>
                        <h6>{items.car_make} {items.car_model}</h6>
                        <h6>Enq by : <span style={{color:'green'}}>{items.name}</span></h6>
                        <div className='Referal-adds-info-div-sub'>
                          <p>{items.car_sale_value}</p>
                          {/* <div className='refral-share-icon-div'>
                          <i className="fa-solid fa-share refral-share-icon"></i>
                          <p className='refral-share-quantity'>6</p>
                          </div> */}
                          {/* <div className='refral-Enquiry-icon-div'>
                          <i style={{color:'green'}} className="fa-solid fa-eye"></i>
                          <p className='refral-enquiry-quantity'>4</p>
                          </div> */}
                          {/* <button>Delete</button> */}
                          {
                            items.is_car_sold_by_user_referal===true?
                              <img className='Referral-sold-image' src={process.env.PUBLIC_URL + '/Sold-image.jpeg'} alt="" />
                              :
                              ''
                          }
                        </div>
                      </div>

                    </div>

            ))
          ):(isLoading?<h6 style={{width:'100vw',margin:'auto',textAlign:'center'}}>Loading...</h6>:
          <h6 style={{width:'100vw',margin:'auto',textAlign:'center'}}>No Referral Enquires</h6>
        )}
                    
                </div>
      </div>
    </div>
  )
}

export default UserReferals