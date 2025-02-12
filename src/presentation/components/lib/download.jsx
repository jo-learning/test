import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
const DownloadCSVorPDF = ({sortedUsers, csvHeaders, tableName}) => {

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(tableName, 20, 10); // Add title
    
        const tableColumn = [
          "ID",
          "Restaurant Name",
          "Owner Name",
          "Email",
          "Phone",
          "Address",
        ];
        const tableRows = sortedUsers.map((user) => [
          user.id,
          user.restaurantName,
          user.fullName,
          user.email,
          user.phone,
          user.address,
        ]);
    
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
        });
    
        doc.save(`${tableName}.pdf`);
      };
    
    //   const csvHeaders = [
    //     { label: "ID", key: "id" },
    //     { label: "Restaurant Name", key: "restaurantName" },
    //     { label: "Owner Name", key: "fullName" },
    //     { label: "Email", key: "email" },
    //     { label: "Phone", key: "phone" },
    //     { label: "Address", key: "address" },
    //   ];
    return (
        <div className="flex justify-between mb-4">
        <CSVLink
          data={sortedUsers}
          headers={csvHeaders}
          filename="users_table.csv"
          className="px-3 mx-2 mt-4 py-2 border border-green-600 text-black dark:text-white rounded hover:bg-green-700"
        >
          CSV
        </CSVLink>
        <button
          onClick={downloadPDF}
          className="px-3 py-2 mx-2 mt-4 bg-transparent border border-red-600  text-black dark:text-white rounded hover:bg-red-700"
        >
          PDF
        </button>
      </div>
    );
}

export default DownloadCSVorPDF;