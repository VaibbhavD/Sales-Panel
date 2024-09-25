import React from "react";
import { useSales } from "../../../Context/SalesContext";

const BottomSection = () => {
  const { invoice, setInvoice } = useSales();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

  // Calculate the due amount
  const dueAmount = Math.round(invoice.totalAmount - invoice.receivedAmount);

  return (
    <div className="flex flex-col sm:flex-row justify-between mt-4">
      {/* Left Side - Payment Type and Description */}
      <div className="w-full sm:w-1/2 p-4">
        {/* Payment Type Dropdown */}
        <label className="block text-gray-600 mb-2 text-sm font-medium">
          Payment Type -
        </label>
        <select
          name="paymentType"
          value={invoice.paymentType}
          onChange={handleInputChange}
          className="p-3 bg-gray-50 rounded-lg shadow-sm mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>

        {/* Description Textarea */}
        <label className="block text-gray-600 mb-2 text-sm font-medium">
          Description -
        </label>
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={invoice.description}
          onChange={handleInputChange}
          className="p-3 bg-gray-50 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
        />
      </div>

      {/* Right Side - Total Amount Breakdown */}
      <div className="w-full sm:w-1/2 flex flex-col items-end p-4">
        {/* Total Amount Display */}
        <div className="mb-4 w-full md:w-1/2 flex justify-between items-center gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Total Amount -
          </label>
          <div className="py-2 px-2 w-1/2 bg-gray-100 text-gray-800 rounded-lg shadow-inner">
            {invoice.totalAmount ? `₹ ${invoice.totalAmount}` : "₹ 0"}
          </div>
        </div>

        {/* Paying Amount Input */}
        <div className="mb-4 w-full md:w-1/2 flex justify-between items-center gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Paying Amount -
          </label>
          <input
            type="number"
            name="receivedAmount"
            value={invoice.receivedAmount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="p-2 bg-gray-50 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
          />
        </div>

        {/* Due Amount Display */}
        <div className="mb-4 w-full md:w-1/2 flex justify-between items-center gap-2">
          <label className="text-gray-600 text-sm font-medium">
            Due Amount -
          </label>
          <div className="py-2 px-2 w-1/2 bg-gray-100 text-gray-800 rounded-lg shadow-inner">
            {dueAmount > 0 ? `₹ ${dueAmount}` : "₹ 0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
