import React, { useEffect, useState } from "react";
import { FaFileExcel, FaPrint, FaPlus, FaArchive } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSales } from "../../Context/SalesContext";
import Invoice from "../Invoice/Invoice";

const Dashboard = () => {
  const { deleteSale, sales, isModalOpen, setIsModalOpen } = useSales();
  const navigate = useNavigate();
  const [Sales, SetSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Sales")) || [];
    SetSales(data);
  }, [sales]);

  const totalPaid = Sales.reduce(
    (total, sale) => total + Number(sale.totalAmount || 0),
    0
  );
  const totalRecived = Sales.reduce(
    (total, sale) => total + Number(sale.receivedAmount || 0),
    0
  );
  const totalUnpaid = totalPaid - totalRecived;

  const openModal = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  // Date filtering function
  const filterSalesByDate = () => {
    if (startDate && endDate) {
      const filteredSales = Sales.filter((sale) => {
        const saleDate = new Date(sale.invoiceDate);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
      });
      SetSales(filteredSales);
    }
  };

  // Reset filter function
  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    const data = JSON.parse(localStorage.getItem("Sales")) || [];
    SetSales(data); // Reset to all sales
  };

  return (
    <div className="min-h-screen bg-gray-100 px-2 md:px-4">
      {/* Header Section */}
      <div className="bg-white rounded-b-lg shadow-md p-4 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
            This Month
          </h2>
          <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <FaPrint className="mr-2" /> Print
            </button>
          </div>
        </div>

        {/* Date Filter Section */}
        <div className="flex flex-col md:flex-row items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-700"
          />
          <span className="text-gray-700">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-700"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={filterSalesByDate}
          >
            Filter
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={resetFilter}
          >
            Reset
          </button>
        </div>

        {/* Total Summary */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
          <div className="bg-green-100 text-green-700 text-center px-4 py-4 rounded-lg shadow-md flex-1">
            Paid <br />
            <span className="font-bold">₹ {totalRecived.toFixed(2)}</span>
          </div>
          <span className="flex items-center font-bold justify-center">+</span>
          <div className="bg-blue-100 text-blue-700 text-center px-4 py-4 rounded-lg shadow-md flex-1">
            Unpaid <br />
            <span className="font-bold">₹ {totalUnpaid.toFixed(2)}</span>
          </div>
          <span className="flex items-center font-bold justify-center">=</span>
          <div className="bg-orange-100 text-orange-700 text-center px-4 py-4 rounded-lg shadow-md flex-1">
            Total <br />
            <span className="font-bold">₹ {totalPaid.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Sales Transactions
          </h3>
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
                    BALANCE DUE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    AMOUNT
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
                    <td className="px-6 py-4">{Sale.invoiceDate}</td>
                    <td className="px-6 py-4">{Sale.invoiceNumber}</td>
                    <td className="px-6 py-4">{Sale.customer}</td>
                    <td className="px-6 py-4">{Sale.items.length}</td>
                    <td className="px-6 py-4">{Sale.paymentType}</td>
                    <td className="px-6 py-4">
                      ₹{" "}
                      {Number(
                        Sale.totalAmount - Sale.receivedAmount || 0
                      ).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      ₹ {Number(Sale.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="flex items-center gap-4 px-6 py-4">
                      <FaPrint
                        className="text-xl text-blue-500 cursor-pointer"
                        onClick={() => openModal(Sale)}
                      />
                      <FaArchive
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => deleteSale(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className=" text-center h-96">No Sales Records Available</div>
        )}
      </div>

      {/* Invoice Modal */}
      {isModalOpen && selectedSale && <Invoice invoice={selectedSale} />}
    </div>
  );
};

export default Dashboard;
