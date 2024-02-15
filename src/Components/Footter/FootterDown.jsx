import React from 'react'
import './FootterStyle.css'
import { Link } from 'react-router-dom'

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
          <div className='footter-bottom-one'>
          <h5>OFFICE</h5>
          <p>Car Relation, Under</p>
            <p>over bridge</p>
            <p> Lalkhadan, Bilaspur Cg</p>
          </div>
          <div className='footter-bottom-one'>
          <h5>LOCATION </h5>
          <Link to="https://www.google.com/maps?q=Car+Relation+Auto+deal">
          <img className='footter-bottom-one-google-map-img' src="https://i.pinimg.com/originals/66/1e/98/661e98a8e38f681575da93d0a1c3f4fc.png" alt="" />
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FootterDown