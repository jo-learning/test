import DashboardLayout from "../../components/Driver/DriverLayout";
import DeliveredTable from "../../components/Driver/DriverDeliveredTable";
import Navbar from "../../components/Navbar";
import UserContext from "../../../shared/utils/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeliveredTablePage() {
  const { user } = useContext(UserContext);
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
        <DeliveredTable />
      </DashboardLayout>
    </>
  );
}

export default DeliveredTablePage;
