import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './presentation/pages/Home';
import AboutPage from './presentation/pages/About';
import { useState, useEffect } from 'react';

import './App.css'
import Signin from './presentation/pages/SignIn';
import SignUp from './presentation/pages/SignUp';
import SplashScreen from './presentation/components/SplashScreen';
import BottomNavigation from './presentation/components/BottomNavigation';
import OTPModal from './presentation/pages/otpmodal';
import CartPage from './presentation/pages/Cart';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from './presentation/pages/Dashboard';
import OrderSummaryTable from './presentation/pages/AdminDashboard/OrderSummary';
import CustomersTable from './presentation/pages/AdminDashboard/CustomerTable';
import ResturantsTable from './presentation/pages/AdminDashboard/ResturantTable';
import ResturantsForm from './presentation/pages/AdminDashboard/ResturantForm';
import DriversTable from './presentation/pages/AdminDashboard/DriverTable';
import CategoriesTable from './presentation/pages/AdminDashboard/CategoryTable';
import VehiclesTable from './presentation/pages/AdminDashboard/VehicleTable';
import VehiclesForm from './presentation/pages/AdminDashboard/VehicleForm';
import DriversForm from './presentation/pages/AdminDashboard/DriverForm';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      toast.success("hey")
    }, 5000); // Show splash screen for 5 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  if (showSplash){
    return (
      <>
        <SplashScreen />
      </>
    );
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/test" element={<OTPModal />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ordersummary" element={<OrderSummaryTable />} />
        <Route path="/customertable" element={<CustomersTable />} />
        <Route path="/resturanttable" element={<ResturantsTable />} />
        <Route path="/resturantform" element={<ResturantsForm />} />
        <Route path="/drivertable" element={<DriversTable />} />
        <Route path="/categorytable" element={<CategoriesTable />} />
        <Route path="/vehicletable" element={<VehiclesTable />} />
        <Route path="/vehicleform" element={<VehiclesForm />} />
        <Route path="/driverform" element={<DriversForm />} />


      </Routes>
      <BottomNavigation />
      
      
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
