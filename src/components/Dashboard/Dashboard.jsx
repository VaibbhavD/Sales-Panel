import React, { useEffect, useState } from "react";
import { FaFileExcel, FaPrint, FaPlus, FaArchive } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSales } from "../../Context/SalesContext";
import Invoice from "../Invoice/Invoice";

const Dashboard = () => {
  const { deleteSale, sales, isModalOpen, setIsModalOpen } = useSales();
  const navigate = useNavigate();
  const [Sales, SetSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null); // For controlling modal
  // const [isModalOpen, SetisModalOpen] = useState(false);

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
    setisModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-700">This Month</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <FaPrint className="mr-2" /> Print
            </button>
          </div>
        </div>

        {/* Total Summary */}
        <div className="flex space-x-4 mt-6">
          <div className="bg-green-100 text-green-700 text-center px-6 py-4 rounded-lg shadow-md">
            Paid <br />
            <span className="font-bold">₹ {totalRecived.toFixed(2)}</span>
          </div>
          <div className="bg-blue-100 text-blue-700 text-center px-6 py-4 rounded-lg shadow-md">
            Unpaid <br />
            <span className="font-bold">₹ {totalUnpaid.toFixed(2)}</span>
          </div>
          <div className="bg-orange-100 text-orange-700 text-center px-6 py-4 rounded-lg shadow-md">
            Total <br />
            <span className="font-bold">₹ {totalPaid.toFixed(2)}</span>
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
                    <td className="flex items-center gap-5 px-6 py-4">
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
          <div className="text-center h-96">No Sales Records Available</div>
        )}
      </div>

      {/* Invoice Modal */}
      {isModalOpen && selectedSale && <Invoice invoice={selectedSale} />}
    </div>
  );
};

export default Dashboard;
