
import { Route, Routes } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import LowerNavBar from './Components/LowerNav/LowerNavBar';
import MiddleNavbar from './Components/MiddleNav/MiddleNavbar';
import UpperNavbar from './Components/UpperNav/UpperNavbar';
import DispCarDetails from './Components/DisplayCarDetailsPage/DispCarDetails';
import FootterDown from './Components/Footter/FootterDown';
import SellCar from './Components/SellCar/SellCar';
import OtherService from './Components/OtherServices/OtherService';
import MainAdvert from './Components/AdvertisementMain/MainAdvert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './Components/scrollToTop';
import Financepage from './Components/FinancePage/Financepage';
import Insurancepage from './Components/InsurancePage/Insurancepage';
import MainHeadBtns from './Components/MainHeadButtons/MainHeadBtns';

function App() {
  return (
    <div className="App">
      <UpperNavbar/>
      <MiddleNavbar/>
      <LowerNavBar/>
      <ScrollToTop/>
      <MainHeadBtns/>
      <Routes>
        <Route path='/' element={<Home/>}/>      
        <Route path='/DisplayCarDetails' element={<DispCarDetails/>}/>
        <Route path='/SellCarPortal' element={<SellCar/>}/>
        <Route path='/FinancePage' element={<Financepage/>}/>
        <Route path='/InsurancePage' element={<Insurancepage/>}/>
      </Routes>
      <OtherService/>
      <MainAdvert/>
      <FootterDown/>
      <ToastContainer />
    </div>
  );
}

export default App;
