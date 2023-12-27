
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
import UserMainPanel from './Components/UserPanel/UserMainPanel';
import { UserDashboard } from './Components/UserDashboard/UserDashboard';
import UserProfileView from './Components/UserIconsExtends/UserProfile/UserProfileView';
import UserReferals from './Components/UserIconsExtends/UserReferrals/UserReferals';

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
        <Route path='/UserMainPanel' element={<UserMainPanel/>}/>
        <Route path='/UserDashboard' element={<UserDashboard/>}/>
        <Route path='/UserDashboardProfile' element={<UserProfileView/>}/>
        <Route path='/UserDashboardReferral' element={<UserReferals/>}/>
      </Routes>
      <OtherService/>
      <MainAdvert/>
      <FootterDown/>
      <ToastContainer />
    </div>
  );
}

export default App;
