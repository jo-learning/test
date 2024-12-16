import DashboardLayout from "../../components/Driver/DriverLayout";
import ProgressTable from "../../components/Driver/DriverProgressTable";
import Navbar from "../../components/Navbar";
import UserContext from "../../../shared/utils/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProgressTablePage() {
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
        <ProgressTable />
      </DashboardLayout>
    </>
  );
}

export default ProgressTablePage;
