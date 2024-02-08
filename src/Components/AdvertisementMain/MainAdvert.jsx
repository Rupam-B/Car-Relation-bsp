import React from 'react'
import './MainAdvertStyle.css'

const MainAdvert = () => {
  return (
    <div className='Main-advert-main-div'>
        <div className='Main-advert-sub-div'>
            <img src={process.env.PUBLIC_URL + '/place-add.PNG'} alt="" />
        </div>
    </div>
  )
}

export default MainAdvert