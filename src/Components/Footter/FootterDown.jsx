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
            <p>Car Relation, Vyapar</p>
            <p>Vihar, Beside AU</p>
            <p> Bank, Bilaspur Cg</p>
          </div>
          <div className='footter-bottom-one'>
          <h5>CONTACT</h5>
            <p>9300007780</p>
            <p>9300005262</p>
            <p>7566557464</p>
          </div>
          <div className='footter-bottom-one footter-bottom-one-dnone'>
          <h5>Opening Hours</h5>
            <p>All Days</p>
            <p>10:00AM – 08:00PM</p>
          </div>
          <div className='footter-bottom-one footter-bottom-one-dnone'>
          <h5>Website </h5>
          <p>https://carrelation.net/</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FootterDown