import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const PDFGenerator = ({ invoice }) => {
  const {
    customer,
    phone,
    billingAddress,
    invoiceNumber,
    invoiceDate,
    stateOfSupply,
    items,
    totalAmount,
    receivedAmount,
    paymentType,
    description,
  } = invoice;
  console.log(totalAmount);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 105, 20, null, null, "center");

    // Invoice details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 60);
    doc.text(`Invoice Date: ${invoiceDate}`, 20, 70);
    doc.text(`State of Supply: ${stateOfSupply}`, 20, 80);

    // Customer and billing details
    doc.setFontSize(12);
    doc.text(`Customer: ${customer}`, 140, 60);
    doc.text(`Phone: ${phone}`, 140, 70);
    doc.text(`Billing Address: ${billingAddress}`, 140, 80);

    // Table for items
    const tableColumns = [
      "Item",
      "Quantity",
      "Price",
      "Tax",
      "Discount",
      "Total",
    ];
    const tableRows = items.map((item) => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      item.taxType || "N/A",
      `${item.discountPercent || 0}%`,
      `₹${(item.quantity * item.price).toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 90,
      head: [tableColumns],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [60, 141, 188] },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    const finalY = doc.autoTable.previous.finalY || 90;

    // Total amounts
    doc.setFontSize(12);
    doc.text(`Total Amount: ₹${totalAmount}`, 20, finalY + 20);
    doc.text(`Received Amount: ₹${receivedAmount}`, 20, finalY + 30);
    doc.text(`Payment Type: ${paymentType}`, 20, finalY + 40);

    // Add description if it exists
    if (description) {
      doc.setFontSize(10);
      doc.text(`Description: ${description}`, 20, finalY + 50);
    }

    // Save the PDF
    doc.save(`${invoiceNumber}.pdf`);
    toast.success("Invoice Downloaded");
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Download Invoice
    </button>
  );
};

export default PDFGenerator;
