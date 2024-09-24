import React, { useEffect, useState } from "react";
import { FaFileExcel, FaPrint, FaPlus } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSales } from "../../Context/SalesContext";
import Invoice from "../Invoice/Invoice";

const SalesInvoice = () => {
  const { deleteSale, sales, setIsModalOpen, isModalOpen } = useSales();
  const navigate = useNavigate();
  const [Sales, SetSales] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Sales")) || [];
    SetSales(data);
  }, [sales]);

  // Calculate total paid and unpaid amounts
  const totalPaid = Math.round(
    Sales.reduce((total, sale) => {
      const amount = Number(sale.totalAmount) || 0; // Convert to number and default to 0
      return total + amount;
    }, 0)
  );

  const totalRecived = Math.round(
    Sales.reduce((total, sale) => {
      const received = Number(sale.receivedAmount) || 0; // Convert to number and default to 0
      return total + received;
    }, 0)
  );

  const totalUnpaid = Math.round(totalPaid - totalRecived);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0 ">
            <h2 className="text-gray-700 px-4 py-2 rounded-lg text-3xl font-bold">
              This Month
            </h2>
            <span className="bg-gray-50 border border-gray-300 text-gray-700 py-2 rounded-lg pr-2  ">
              <span className="bg-gray-200 border-r-2 text-gray-700 py-3 px-4 rounded-lg mr-2">
                Between
              </span>
              01/09/2024{" "}
              <span className="text-xl text-black bold px-2">to</span>{" "}
              01/09/2024
            </span>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <FaPrint className="mr-2" /> Print
            </button>
          </div>
        </div>

        {/* Total Summary */}
        <div className="flex flex-wrap justify-between items-center mt-6">
          <div className="flex space-x-4 w-full md:w-auto">
            <div className="bg-green-100 text-green-700 text-center px-6 py-4 rounded-lg shadow-md  w-32">
              Paid <br />
              <span className="font-bold">₹ {totalRecived.toFixed(2)}</span>
            </div>
            <span className="flex justify-center items-center ">+</span>
            <div className="bg-blue-100 text-blue-700 text-center px-6 py-4 rounded-lg shadow-md w-32">
              Unpaid <br />
              <span className="font-bold">₹ {totalUnpaid.toFixed(2)}</span>
            </div>
            <span className="flex justify-center items-center">=</span>
            <div className="bg-orange-100 text-orange-700 text-center px-6 py-4 rounded-lg shadow-md w-32">
              Total <br />
              <span className="font-bold">₹ {totalPaid.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => navigate("/add-sale")}
          >
            <FaPlus className="mr-2" /> Add Sale
          </button>
        </div>
        {Sales.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    INVOICE NO.
                  </th>
                  <th scope="col" className="px-6 py-4">
                    PARTY NAME
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ITEMS
                  </th>
                  <th scope="col" className="px-6 py-4">
                    PAYMENT TYPE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    AMOUNT
                  </th>
                  <th scope="col" className="px-6 py-4">
                    BALANCE DUE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {Sales.map((Sale, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {Sale.invoiceDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Sale.invoiceNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Sale.customer}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Sale.items.length}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {Sale.paymentType}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ₹ {Number(Sale.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ₹{" "}
                      {Number(
                        Sale.totalAmount - Sale.receivedAmount || 0
                      ).toFixed(2)}
                    </td>
                    <td className="flex items-center gap-5 px-6 py-4">
                      <FaPrint
                        className="text-xl text-blue-500 cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      />
                      <FaArchive
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => deleteSale(index)}
                      />
                    </td>
                    {isModalOpen && <Invoice invoice={Sale} />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No sales available
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesInvoice;
