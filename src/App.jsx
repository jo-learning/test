import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import { useState, useEffect } from 'react';

import './App.css'
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import SplashScreen from './components/SplashScreen';
import BottomNavigation from './components/BottomNavigation';
import OTPModal from './pages/otpmodal';
import CartPage from './pages/Cart';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Show splash screen for 5 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  if (showSplash){
    return (
      <SplashScreen />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/test" element={<OTPModal />} />

      </Routes>
      <BottomNavigation />
    </Router>
  )
}

export default App
