import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./presentation/pages/Home";
import AboutPage from "./presentation/pages/About";
// import { useState, useEffect} from "react";

import "./App.css";
import Signin from "./presentation/pages/SignIn";
import SignUp from "./presentation/pages/SignUp";
// import SplashScreen from "./presentation/components/SplashScreen";
import BottomNavigation from "./presentation/components/BottomNavigation";
import OTPModal from "./presentation/pages/otpmodal";
import CartPage from "./presentation/pages/Cart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./presentation/pages/Dashboard";
import OrderSummaryTable from "./presentation/pages/AdminDashboard/OrderSummary";
import CustomersTable from "./presentation/pages/AdminDashboard/CustomerTable";
import ResturantsTable from "./presentation/pages/AdminDashboard/ResturantTable";
import ResturantsForm from "./presentation/pages/AdminDashboard/ResturantForm";
import DriversTable from "./presentation/pages/AdminDashboard/DriverTable";
import CategoriesTable from "./presentation/pages/AdminDashboard/CategoryTable";
import VehiclesTable from "./presentation/pages/AdminDashboard/VehicleTable";
import VehiclesForm from "./presentation/pages/AdminDashboard/VehicleForm";
import DriversForm from "./presentation/pages/AdminDashboard/DriverForm";
import FoodsTable from "./presentation/pages/RestaurantDashboard/FoodTable";
// import DrinksTable from "./presentation/pages/RestaurantDashboard/DrinkTable";
// import DrinksForm from "./presentation/pages/RestaurantDashboard/DrinkForm";
import FoodsForm from "./presentation/pages/RestaurantDashboard/FoodForm";
import ReadyTablePage from "./presentation/pages/DriverDashboard/ReadyTable";
import ProgressTablePage from "./presentation/pages/DriverDashboard/ProgressTable";
import DeliveredTablePage from "./presentation/pages/DriverDashboard/DeliveredTable";
import DetailPage from "./presentation/pages/Detail";
import RestaurantOrderSummaryTable from "./presentation/pages/RestaurantDashboard/OrderSummary";
import RestaurantDashboardPage from "./presentation/pages/RestaurantDashboard/Dashboard";
import RestaurantPage from "./presentation/pages/Restaurant";
// import AuthContext from "./shared/utils/AuthContext";
import { UserProvider } from "./shared/utils/UserContext.jsx";

import ProtectedRoute from "./presentation/components/protected/ProtectedRoute";
import ProtectedDriverRoute from "./presentation/components/protected/ProtectedDriverRoute.jsx";
import ProtectedRestaurantRoute from "./presentation/components/protected/ProtectedRestaurantRoute.jsx";
import OrderTablePage from "./presentation/pages/User/OrdersTable.jsx";
import ResDetailPage from "./presentation/pages/RestaurantDetail.jsx";
// import { apiClient } from "./data/services/apiClient";

function App() {
  // const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //     toast.success("hey");
  //   }, 5000); // Show splash screen for 5 seconds

  //   return () => clearTimeout(timer); // Cleanup timeout on component unmount
  // }, []);

  // if (showSplash) {
  //   return (
  //     <>
  //       <SplashScreen />
  //     </>
  //   );
  // }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/test" element={<OTPModal />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute >
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ordersummary"
            element={
              <ProtectedRoute>
                <OrderSummaryTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customertable"
            element={
              <ProtectedRoute >
                <CustomersTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resturanttable"
            element={
              <ProtectedRoute >
                <ResturantsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resturantform"
            element={
              <ProtectedRoute >
                <ResturantsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivertable"
            element={
              <ProtectedRoute >
                <DriversTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute >
                <OrderTablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorytable"
            element={
              <ProtectedRoute >
                <CategoriesTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicletable"
            element={
              <ProtectedRoute >
                <VehiclesTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicleform"
            element={
              <ProtectedRoute >
                <VehiclesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driverform"
            element={
              <ProtectedRoute >
                <DriversForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/foodtable"
            element={
              <ProtectedRestaurantRoute >
                <FoodsTable />
              </ProtectedRestaurantRoute>
            }
          />
          {/* <Route path="/drinktable" element={<DrinksTable />} /> */}
          {/* <Route path="/drinkform" element={<DrinksForm />} /> */}
          <Route
            path="/foodform"
            element={
              <ProtectedRestaurantRoute >
                <FoodsForm />
              </ProtectedRestaurantRoute>
            }
          />
          <Route
            path="/readytable"
            element={
              <ProtectedDriverRoute >
                <ReadyTablePage />
              </ProtectedDriverRoute>
            }
          />
          <Route
            path="/progresstable"
            element={
              <ProtectedDriverRoute >
                <ProgressTablePage />
              </ProtectedDriverRoute>
            }
          />
          <Route
            path="/deliveredtable"
            element={
              <ProtectedDriverRoute >
                <DeliveredTablePage />
              </ProtectedDriverRoute>
            }
          />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/restaurantdetail/:id" element={<ResDetailPage />} />
          <Route
            path="/restaurantordersummary"
            element={<ProtectedRestaurantRoute><RestaurantOrderSummaryTable /></ProtectedRestaurantRoute>}
          />
          <Route
            path="/restaurantdashboard"
            element={<ProtectedRestaurantRoute><RestaurantDashboardPage /></ProtectedRestaurantRoute>}
          />
          <Route path="/restaurant" element={<RestaurantPage />} />
        </Routes>
        <BottomNavigation />
      </Router>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
