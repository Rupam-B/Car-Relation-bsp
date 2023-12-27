import React, { useState } from 'react'
import './ScratchCardStyle.css'
import { Link} from 'react-router-dom'

const RewarsScratchCards = () => {

  const [isScratched, setScratched] = useState(false);
  const [scratchId, setScratchId] = useState('');

  const handleScratch = (getId)=>{
    setScratched(true)
    setScratchId(getId)

  }



  const winData = [
    {
      id:1,
      won:"You Won 180₹"
    },
    {
      id:2,
      won:"You Won 30₹"
    },
    {
      id:3,
      won:"You Won 250₹"
    },
    {
      id:4,
      won:"You Won 500₹"
    },
  ]


  return (
    <div className='User-Rewards-Main-div'>
      <div className='User-Rewards-sub-div'>
      <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>

        <div  className='Rewards-Top-Heading'>
        <h1>Your Rewards</h1>
        </div>
        <div className='Rewards-top-head-line'></div>
        {winData.map((winitems)=>(
      <div key={winitems.id} className="Rewards-add-content-sub">
        <div onClick={()=>handleScratch(winitems.id)} className={isScratched&&scratchId===winitems.id?'Rewards-add-showing-div-scratched':'Rewards-add-showing-div-scratch'}>
          {
            isScratched&&scratchId===winitems.id?
          <h4 className='reward-get-h4'>{winitems.won}</h4>
          :
          <div className='Tap-to-see-reward-div'>
          <h5 style={{fontSize:'1.5rem'}}>Tap to see Reward</h5>
          <i style={{fontSize:'2.5rem'}} class="fa-solid fa-hand-point-up"></i>
          </div>
          }

        </div>

      </div>
      ))}
      </div>
    </div>
  )
}

export default RewarsScratchCards

