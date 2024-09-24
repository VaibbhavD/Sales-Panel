import React from "react";
import { useSales } from "../../Context/SalesContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const Invoice = ({ invoice }) => {
  const { setIsModalOpen } = useSales();
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

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add company logo
    // const logoUrl =
    //   "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg";

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
      `$${item.price}`,
      item.taxType || "N/A",
      `${item.discountPercent || 0}%`,
      `$${(item.quantity * item.price).toFixed(2)}`,
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
    doc.text(`Total Amount: $${totalAmount}`, 20, finalY + 20);
    doc.text(`Received Amount: $${receivedAmount}`, 20, finalY + 30);
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal container */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 w-11/12 md:w-2/3">
          {/* Invoice Content */}

          <div className="p-6">
            <h2 className="text-xl font-bold">Invoice</h2>
            <div className="grid grid-cols-2 gap-6 items-center">
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                  alt="company-logo"
                  className="w-24 h-24"
                />
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-700">
                  Invoice number:{" "}
                  <span className="font-bold">{invoiceNumber}</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Invoice date: <span>{invoiceDate}</span>
                </p>
                <p className="font-semibold text-gray-700">
                  State of supply: <span>{stateOfSupply}</span>
                </p>
                <div className="mt-8 mr-2">
                  <p className="font-bold text-gray-800">Bill to:</p>
                  <p className="text-gray-600">{customer}</p>
                  <p className="text-gray-600">{billingAddress}</p>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <table className="min-w-full table-auto">
                <thead className="border-b-2 border-gray-300 text-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">TAX</th>
                    <th className="px-4 py-2 text-right">Discount</th>
                    <th className="px-4 py-2 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-4 text-gray-700">{item.name}</td>
                      <td className="px-4 py-4 text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        ${item.price}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        {item.taxType}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        {item.discountPercent}%
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-gray-800">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid justify-end pr-10">
              <p className="font-medium text-gray-700 mb-1">
                Total Amount: ${totalAmount !== null ? totalAmount : "N/A"}
              </p>
              <p className="font-medium text-gray-700 mb-1">
                Received Amount: ${receivedAmount}
              </p>
              <p className="font-medium text-gray-700 mb-1">
                Payment Type: {paymentType}
              </p>
            </div>

            <div className="flex justify-end p-6 border-b">
              <div className="flex space-x-2">
                <button
                  onClick={downloadPDF}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Download Invoice
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>

            {description && (
              <div className="mt-6 border-t pt-4 text-gray-700">
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
