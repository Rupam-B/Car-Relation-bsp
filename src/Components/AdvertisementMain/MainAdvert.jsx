import React, { useEffect, useState } from 'react'
import './MainAdvertStyle.css'
import BaseURL from '../../apiconfig'
import axios from 'axios'

const MainAdvert = () => {

  const [footerImage, setFooterImage] = useState('')

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
            // console.log(data.data.footer_img)
            setFooterImage(data.data.footer_img)
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
    <div className='Main-advert-main-div'>
        <div className='Main-advert-sub-div'>
            {/* <img src={process.env.PUBLIC_URL + '/place-add.PNG'} alt="" /> */}
            <img src={footerImage} alt="" />
        </div>
    </div>
  )
}

export default MainAdvert