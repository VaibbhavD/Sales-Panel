import React from "react";
import { jsPDF } from "jspdf";
import { FaFilePdf } from "react-icons/fa";

const SalesPDF = ({ sales }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the title
    doc.setFontSize(20);
    doc.text("Sales Records", 14, 20);

    // Set column headers
    doc.setFontSize(12);
    const headers = [
      "Date",
      "Invoice No.",
      "Party Name",
      "Items",
      "Payment Type",
      "Balance Due",
      "Amount",
    ];
    const startY = 30;
    headers.forEach((header, index) => {
      doc.text(header, 14 + index * 30, startY);
    });

    // Add sales data to PDF
    sales.forEach((sale, index) => {
      const y = startY + 10 * (index + 1);
      doc.text(sale.invoiceDate, 14, y);
      doc.text(sale.invoiceNumber, 44, y);
      doc.text(sale.customer, 74, y);
      doc.text(String(sale.items.length), 104, y);
      doc.text(sale.paymentType, 134, y);
      doc.text(
        `₹ ${Number(sale.totalAmount - sale.receivedAmount || 0).toFixed(2)}`,
        164,
        y
      );
      doc.text(`₹ ${Number(sale.totalAmount || 0).toFixed(2)}`, 194, y);
    });

    // Save the PDF
    doc.save("sales_records.pdf");
  };

  return (
    <button
      className="bg-blue-600 text-white p-2 md:text-sm flec justify-end text-xs  rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
      onClick={generatePDF}
    >
      <FaFilePdf className="mr-2" /> {/* Add PDF icon here */}
      Download PDF
    </button>
  );
};

export default SalesPDF;
