import DashboardLayout from "../../components/Restaurant/RestaurantLayout";
import Dashboard from "../../components/Restaurant/RestaurantDashboard";
import Navbar from "../../components/Navbar";
// import UserContext from "../../shared/utils/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RestaurantDashboardPage() {
  // const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  useEffect(() => {
    // if (user.length > 0) {
    //   if (user[3].role == "admin") {
    //     true;
    //   } else {
    //     navigate("/");
    //   }
    // } else {
    //   navigate("/");
    // }
  }, []);

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </>
  );
}

export default RestaurantDashboardPage;
