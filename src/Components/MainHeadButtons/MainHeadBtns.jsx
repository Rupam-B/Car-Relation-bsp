import React, { useState } from 'react'
import './MainButtons.css'
import { Link } from 'react-router-dom'

const MainHeadBtns = () => {

  const [buybuttonActive, setBuyButtonActive] = useState(true)
  const [sellbuttonActive, setSellButtonActive] = useState(false)
  const [financebuttonActive, setFinanceButtonActive] = useState(false)
  const [insurancebutonActive, setInsuranceButtonActive] = useState(false)


  const handleBuyButton =()=>{
    setBuyButtonActive(true)
    setSellButtonActive(false)
    setFinanceButtonActive(false)
    setInsuranceButtonActive(false)
  }
  const handleSellButton =()=>{
    setSellButtonActive(true)
    setBuyButtonActive(false)
    setFinanceButtonActive(false)
    setInsuranceButtonActive(false)
  }
  const handleFinanceButton =()=>{
    setFinanceButtonActive(true)
    setSellButtonActive(false)
    setBuyButtonActive(false)
    setInsuranceButtonActive(false)
  }
  const handleInsuranceButton =()=>{
    setInsuranceButtonActive(true)
    setFinanceButtonActive(false)
    setSellButtonActive(false)
    setBuyButtonActive(false)
  }



  return (
    <div className='buy-sell-btn-main-div'>
      <div className='buy-sell-btn'>
        <Link onClick={handleBuyButton} to={'/'} className={buybuttonActive ? 'buy-sell-btn-two-active' : 'buy-sell-btn-two'}>Buy</Link>
        <Link onClick={handleSellButton} to={'/SellCarPortal'} className={sellbuttonActive ? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Sell</Link>
        <Link onClick={handleFinanceButton} to={'/FinancePage'} className={financebuttonActive ? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Finance</Link>
        <Link onClick={handleInsuranceButton} to={'/InsurancePage'} className={insurancebutonActive? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Insurance</Link>
        
      </div>
    </div>
  )
}

export default MainHeadBtns