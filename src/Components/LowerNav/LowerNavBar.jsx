import React from 'react'
import './LowerNavStyle.css'

const LowerNavBar = () => {
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
          <img src={process.env.PUBLIC_URL + '/advertisement-logo.jpg'} alt="" />
        </div>
    </div>
  )
}

export default LowerNavBar