import DashboardLayout from "../../components/Admin/AdminLayout";
import ResturantForm from "../../components/Admin/AdminResturantForm";
import Navbar from "../../components/Navbar";
import UserContext from "../../../shared/utils/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResturantsForm() {
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
        <ResturantForm />
      </DashboardLayout>
    </>
  );
}

export default ResturantsForm;
