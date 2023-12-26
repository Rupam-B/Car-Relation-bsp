import React, { useEffect, useState } from 'react'
import './MainButtons.css'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainHeadBtns = () => {

  const location = useLocation()
  const userVerify =useSelector((state)=>state.verifyingBoolforUser)

  const [buybuttonActive, setBuyButtonActive] = useState(true)
  const [sellbuttonActive, setSellButtonActive] = useState(false)
  const [financebuttonActive, setFinanceButtonActive] = useState(false)
  const [insurancebutonActive, setInsuranceButtonActive] = useState(false)


  const handleBuyButton =()=>{
    setBuyButtonActive(true)
    setSellButtonActive(false)
    setFinanceButtonActive(false)
    setInsuranceButtonActive(false)
    localStorage.setItem('activeButton', 'buy');
  }
  const handleSellButton =()=>{
    setSellButtonActive(true)
    setBuyButtonActive(false)
    setFinanceButtonActive(false)
    setInsuranceButtonActive(false)
    localStorage.setItem('activeButton', 'sell');
  }
  const handleFinanceButton =()=>{
    setFinanceButtonActive(true)
    setSellButtonActive(false)
    setBuyButtonActive(false)
    setInsuranceButtonActive(false)
    localStorage.setItem('activeButton', 'finance');
  }
  const handleInsuranceButton =()=>{
    setInsuranceButtonActive(true)
    setFinanceButtonActive(false)
    setSellButtonActive(false)
    setBuyButtonActive(false)
    localStorage.setItem('activeButton', 'insurance');
  }


  useEffect(() => {
    const activeButton = localStorage.getItem('activeButton');
    if (activeButton) {
      switch (activeButton) {
        case 'buy':
          handleBuyButton();
          break;
        case 'sell':
          handleSellButton();
          break;
        case 'finance':
          handleFinanceButton();
          break;
        case 'insurance':
          handleInsuranceButton();
          break;
        default:
          break;
      }
    }
  }, [location.pathname]);



  return (
    <div className='buy-sell-btn-main-div'>
      <div className='buy-sell-btn'>
        <Link onClick={handleBuyButton} to={'/'} className={buybuttonActive ? 'buy-sell-btn-two-active' : 'buy-sell-btn-two'}>Buy</Link>
        <Link onClick={handleSellButton} to={userVerify===1?'/SellCarPortal':'/UserMainPanel'} className={sellbuttonActive ? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Sell</Link>
        <Link onClick={handleFinanceButton} to={'/FinancePage'} className={financebuttonActive ? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Finance</Link>
        <Link onClick={handleInsuranceButton} to={'/InsurancePage'} className={insurancebutonActive? 'buy-sell-btn-one' : 'buy-sell-btn-one-inactive'}>Insurance</Link>
        
      </div>
    </div>
  )
}

export default MainHeadBtns