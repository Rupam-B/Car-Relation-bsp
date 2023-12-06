import React from 'react'
import './FootterStyle.css'

const FootterDown = () => {
  return (
    <div className='Footter-Main-div'>
      <div className='Footter-Sub div'>
        <div className='Footter-Sub-Top'>

        </div>
        <hr style={{color:'white'}}/>
        <div className='Footter-Sub-Bottom'>
          <div className='footter-bottom-one'>
            <h5>OFFICE</h5>
            <p>Bilaspur Cg</p>
          </div>
          <div className='footter-bottom-one'>
          <h5>CONTACT</h5>
            <p>9876535</p>
            <p>hello@voiture.com</p>
          </div>
          <div className='footter-bottom-one'>
          <h5>Opening Hours</h5>
            <p>Monday – Friday: 09:00AM – 09:00PM</p>
            <p>Saturday: 09:00AM – 07:00PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className='footter-bottom-one'>
          <h5>Keep In Touch </h5>
          <input type="text" placeholder='email' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FootterDown