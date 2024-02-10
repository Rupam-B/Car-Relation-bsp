import React, { useEffect, useState } from 'react'
import './LowerNavStyle.css'
import BaseURL from '../../apiconfig'
import axios from 'axios'

const LowerNavBar = () => {

  const [headerImage, setHeaderImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/setting/header-footer`, {
          mode: "no-cors",
          headers: {
            Accept: "application/json"
          },
        });

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          if (data) {
            console.log(data.data.header_img)
            setHeaderImage(data.data.header_img)
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
    <div className='LowerNav-main-div'>
        {/* <div className='Lower-Nav-Sub-div'>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div> */}

        <div className='Lowenav-add-showing-div'>
          {/* <img src="https://marutisuzukitruevaluecdn2.azureedge.net/-/media/feature/truevaluehub/articleimages/a-word-of-trust/trust-img-4.jpg?modified=20210201132639" alt="" /> */}
          {/* <img src={process.env.PUBLIC_URL + '/advertisement-logo.jpg'} alt="" /> */}
          <img src={headerImage} alt="" />
        </div>
    </div>
  )
}

export default LowerNavBar