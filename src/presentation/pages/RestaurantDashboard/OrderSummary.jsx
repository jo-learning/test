import DashboardLayout from "../../components/Restaurant/RestaurantLayout";
import OrderSummary from "../../components/Restaurant/RestaurantOrderSummaryTable";
import Navbar from "../../components/Navbar";
// import UserContext from "../../../shared/utils/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RestaurantOrderSummaryTable() {
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
        <OrderSummary />
      </DashboardLayout>
    </>
  );
}

export default RestaurantOrderSummaryTable;
