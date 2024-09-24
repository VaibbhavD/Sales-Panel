import React from "react";
import { FaFileExcel, FaPrint, FaPlus, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSales } from "../../Context/SalesContext";

const SalesInvoice = () => {
  console.log(useSales());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0 ">
            <h2 className=" text-gray-700 px-4 py-2 rounded-lg text-3xl font-bold">
              This Month
            </h2>
            <span className="bg-gray-50 border border-gray-300 text-gray-700 py-2 rounded-lg pr-2 ">
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
        <div className="flex flex-wrap justify-between items-center mt-6 ">
          <div className="flex space-x-4 w-full md:w-auto">
            <div className="bg-green-100 text-green-700 text-center px-10 py-4 rounded-lg shadow-md w-full sm:w-auto">
              Paid <br />
              <span className="font-bold">₹ 446.00</span>
            </div>
            <span className="flex justify-center items-center">+</span>
            <div className="bg-blue-100 text-blue-700 text-center px-6 py-4 rounded-lg shadow-md w-full sm:w-auto">
              Unpaid <br />
              <span className="font-bold">₹ 1,382.00</span>
            </div>
            <span className="flex justify-center items-center">=</span>

            <div className="bg-orange-100 text-orange-700 text-center px-6 py-4 rounded-lg shadow-md w-full sm:w-auto">
              Total <br />
              <span className="font-bold">₹ 1,882.00</span>
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
                  TRANSACTION
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
              {/* Replace with dynamic data */}
              <tr className="border-b bg-gray-50 hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4">21/09/2024</td>
                <td className="whitespace-nowrap px-6 py-4">6</td>
                <td className="whitespace-nowrap px-6 py-4">xianinfotech</td>
                <td className="whitespace-nowrap px-6 py-4">Sale</td>
                <td className="whitespace-nowrap px-6 py-4">Cash</td>
                <td className="whitespace-nowrap px-6 py-4">₹ 15</td>
                <td className="whitespace-nowrap px-6 py-4">0</td>
                <td className="flex items-center gap-5 px-6 py-4">
                  <FaPrint />
                  View
                </td>
              </tr>
              {/* Alternate Row Example */}
              <tr className="border-b bg-white hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4">22/09/2024</td>
                <td className="whitespace-nowrap px-6 py-4">7</td>
                <td className="whitespace-nowrap px-6 py-4">TechCo</td>
                <td className="whitespace-nowrap px-6 py-4">Sale</td>
                <td className="whitespace-nowrap px-6 py-4">Card</td>
                <td className="whitespace-nowrap px-6 py-4">₹ 200</td>
                <td className="whitespace-nowrap px-6 py-4">₹ 50</td>
                <td className="flex items-center gap-5 px-6 py-4">
                  <FaPrint />
                  View
                </td>
              </tr>
              {/* Repeat rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoice;
