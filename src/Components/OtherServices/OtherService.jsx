import React, { useEffect, useState } from "react";
import "./OtherServiceStyle.css";
import BaseURL from '../../apiconfig'
import axios from 'axios';

const OtherService = () => {


  const [userStoreAdds,setUserStoredAdds] = useState()
  const [userInsuranceStoreAdds,setUserInsuranceStoredAdds] = useState()

//    For Finance Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/service/finance`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
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
  }, []);


  //    For Insurance Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/service/insurance`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if (data) {
            // console.log(data.data)
            setUserInsuranceStoredAdds(data.data);
          }
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="OtherServices-main-div">
      <div className="Other-services-sub-div">
        <div className="Finance-sector">
        <h1>Finance</h1>
        <div className='Finance-page-main-div'>
        <div className='Finance-page-sub-div'>
            <div className='Finance-company-images-div' >
                <div className='Finance-company-image-showing-div'>
                  <img src={userStoreAdds&&userStoreAdds.banner_image} alt="" />
                </div>
            </div>
            <div className='Finance-company-advertisement-images-div' >
                <div className='Finance-company-image-showing-div'>
                  <img src={userStoreAdds&&userStoreAdds.advertisement_image} alt="" />
                </div>
            </div>
            <div className='Finance-Documents-Req-div'>
                {/* <h4>Documents Required</h4> */}
                <div dangerouslySetInnerHTML={{ __html: userStoreAdds && userStoreAdds.details }} />
            </div>
        </div>
    </div>
        </div>
        <hr />
        <div className="Insurance-sector">
          <h1>Insurance</h1>
          <div className='Finance-page-main-div'>
        <div className='Finance-page-sub-div'>
            <div className='Finance-company-images-div'>
                <div className='Finance-company-image-showing-div'>
                  <img src={userInsuranceStoreAdds&&userInsuranceStoreAdds.banner_image} alt="" />
                </div>
            </div>
            <div className='Finance-company-advertisement-images-div' >
                <div className='Finance-company-image-showing-div'>
                  <img src={userInsuranceStoreAdds&&userInsuranceStoreAdds.advertisement_image} alt="" />
                </div>
            </div>
            <div className='Finance-Documents-Req-div'>
                {/* <h4>Documents Required</h4> */}
                <div dangerouslySetInnerHTML={{ __html: userInsuranceStoreAdds && userInsuranceStoreAdds.details }} />
            </div>
        </div>
    </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OtherService;
