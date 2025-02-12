import DashboardLayout from "../../components/Driver/DriverLayout";
import ReadyTable from "../../components/Driver/DriverReadyTable";
import Navbar from "../../components/Navbar";

function ReadyTablePage() {

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <ReadyTable />
      </DashboardLayout>
    </>
  );
}

export default ReadyTablePage;
