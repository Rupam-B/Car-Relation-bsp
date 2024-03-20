
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import RewarsScratchCards from './Components/UserIconsExtends/UserRewards/RewarsScratchCards';
import UserEarning from './Components/UserIconsExtends/UserEarnings/UserEarning';
import UserAddUpload from './Components/UserIconsExtends/UserAddUploads/UserAddUpload';
import UserRoyality from './Components/UserIconsExtends/UserRoyality/UserRoyality';
import UserCarList from './Components/UserIconsExtends/UserCarList/UserCarList';
import EditAffiliation from './Components/UserIconsExtends/UserAffiliationDetails/UserAffiliationDetails';
import ServiceNotAvailable from './Components/ServiceNotAvailable/ServiceNotAvailable';
import ProductAffiliationPage from './Components/ProductAffiliationPage/ProductAffiliationPage';
import ProductDetailsOnlyView from './Components/ProductDetailsOnlyView/ProductDetailsOnlyView';
import BookmarkPage from './Components/BookMarkPage/BookmarkPage';
import FavouritePage from './Components/FavouritesPage/FavouritePage';
import { useEffect } from 'react';
import EmployeeMainPanel from './Components/EmployeeSection/EmployeeMainPanel/EmployeeMainPanel';
import EmployeeSalarySection from './Components/EmployeeSection/EmployeeSubPanel/EmployeeSalarysection/EmployeeSalarySection';
import EmployeeAttendance from './Components/EmployeeSection/EmployeeSubPanel/EmployeeAttendanceSection/EmployeeAttendance';
import EmployeeDocument from './Components/EmployeeSection/EmployeeSubPanel/EmployeeDocumentSection/EmployeeDocument';
import EmployeeLeave from './Components/EmployeeSection/EmployeeSubPanel/EmployeeLeave/EmployeeLeave';
import AdvisorMainPanel from './Components/AdvisorSection/AdvisorMainPanel/AdvisorMainPanel';
import AdvisorDocuments from './Components/AdvisorSection/AdvisorSubPanel/AdvisorDocuments';
import AdvisorIncentive from './Components/AdvisorSection/AdvisorSubPanel/AdvisorIncentive';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';
import NotificationPage from './Components/NotificationsPage/NotificationPage';
import SearchFunction from './Components/HomePage/SearchSection/SearchFunction';
import FilterSection from './Components/HomePage/FilterSection/FilterSection';

function App() {
  // const history = useHistory();
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = () => {
      navigate(-1); // Equivalent to history.goBack()
    };

    document.addEventListener('backbutton', handleBackButton);

    return () => {
      document.removeEventListener('backbutton', handleBackButton);
    };
  }, [navigate]);
  return (
    <div className="App">
      <UpperNavbar/>
      <MiddleNavbar/>
      <LowerNavBar/>
      <ScrollToTop/>
      <MainHeadBtns/>
      <Routes>
        <Route path='/' element={<Home/>}/>          
        <Route path='/SearchFunction' element={<SearchFunction/>}/>          
        <Route path='/FilterSection' element={<FilterSection/>}/>          
        <Route path='/ServiceNotAvailable' element={<ServiceNotAvailable/>}/>      
        <Route path='/DisplayCarDetails' element={<DispCarDetails/>}/>
        <Route path={'/DisplayCarDetailsAffiliation/:affiliationId/:carId'} element={<ProductAffiliationPage/>}/>
        <Route path={'/DisplayCarDetailsOnlyView/:carId'} element={<ProductDetailsOnlyView/>}/>
        <Route path='/FinancePage' element={<Financepage/>}/>
        <Route path='/InsurancePage' element={<Insurancepage/>}/>
        <Route path='/UserMainPanel' element={<UserMainPanel/>}/>

        <Route element={<PrivateComponent/>}>
        <Route path='/NotificationPage' element={<NotificationPage/>}/>  
        <Route path='/SellCarPortal' element={<SellCar/>}/>
        <Route path='/UserDashboard' element={<UserDashboard/>}/>
        <Route path='/UserDashboardProfile' element={<UserProfileView/>}/>
        <Route path='/UserDashboardReferral' element={<UserReferals/>}/>
        <Route path='/UserRewardsScratchCard' element={<RewarsScratchCards/>}/>
        <Route path='/UserEarnings' element={<UserEarning/>}/>
        <Route path='/UserCarList' element={<UserCarList/>}/>
        <Route path='/UserAffiliation' element={<EditAffiliation/>}/>
        <Route path='/UserAddUploads' element={<UserAddUpload/>}/>
        <Route path='/UserRoyality' element={<UserRoyality/>}/>
        <Route path='/UserBookMarkPage' element={<BookmarkPage/>}/>
        <Route path='/UserFavouritePage' element={<FavouritePage/>}/>

        <Route path='/EmployeeMainPanel' element={<EmployeeMainPanel/>}/>
        <Route path='/EmployeeSalarySection' element={<EmployeeSalarySection/>}/>
        <Route path='/EmployeeAttendanceSection' element={<EmployeeAttendance/>}/>
        <Route path='/EmployeeDocumentSection' element={<EmployeeDocument/>}/>
        <Route path='/EmployeeApplyLeaveSection' element={<EmployeeLeave/>}/>

        <Route path='/AdvisorMainPanel' element={<AdvisorMainPanel/>}/>
        <Route path='/AdvisorDocumentSection' element={<AdvisorDocuments/>}/>
        <Route path='/AdvisorIncentiveSection' element={<AdvisorIncentive/>}/>
        </Route>
      </Routes>
      <OtherService/>
      <MainAdvert/>
      <FootterDown/>
      <ToastContainer />
    </div>
  );
}

export default App;
