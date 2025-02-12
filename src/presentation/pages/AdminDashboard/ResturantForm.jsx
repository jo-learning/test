import DashboardLayout from "../../components/Admin/AdminLayout";
import ResturantForm from "../../components/Admin/AdminResturantForm";
import Navbar from "../../components/Navbar";

function ResturantsForm() {

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
