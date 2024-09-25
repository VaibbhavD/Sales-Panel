import React from "react";
import { useSales } from "../../Context/SalesContext";
import PDFGenerator from "./PdfGenrater";
import Logo from "../../components/Logo/Logo";

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
                <Logo size={24} />
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
                        ${item.FinalAmount}
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
                {/* Pass invoice as a prop to PDFGenerator */}
                <PDFGenerator invoice={invoice} />
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
