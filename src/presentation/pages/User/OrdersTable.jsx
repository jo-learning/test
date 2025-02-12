import DashboardLayout from "../../components/User/UserLayout";
import Navbar from "../../components/Navbar";
import OrdersTable from "../../components/User/OrdersTable";

function OrderTablePage() {

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <OrdersTable />
      </DashboardLayout>
    </>
  );
}

export default OrderTablePage;
