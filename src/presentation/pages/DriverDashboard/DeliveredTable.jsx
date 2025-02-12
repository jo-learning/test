import DashboardLayout from "../../components/Driver/DriverLayout";
import DeliveredTable from "../../components/Driver/DriverDeliveredTable";
import Navbar from "../../components/Navbar";

function DeliveredTablePage() {

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
