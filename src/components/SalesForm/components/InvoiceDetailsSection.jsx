import React, { useEffect, useState } from "react";
import { useSales } from "../../../Context/SalesContext";

const InvoiceDetailsSection = () => {
  const { invoice, setInvoice } = useSales();
  const [InvoiceNo, SetInvoiceNo] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  // Generate the invoice number once when the component mounts
  useEffect(() => {
    const generatedInvoiceNumber = `INV-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    SetInvoiceNo(generatedInvoiceNumber);

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      invoiceNumber: generatedInvoiceNumber,
    }));
  }, [setInvoice]);

  return (
    <div className="lg:w-1/2 mb-4">
      {/* Flex container for Invoice Number and Invoice Date inputs */}
      <div className="flex flex-col md:flex-row justify-end mb-4 md:space-x-4">
        {/* Invoice Number input */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm md:text-base">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={InvoiceNo}
            className="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>

        {/* Invoice Date input */}
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 text-sm md:text-base">
            Invoice Date
          </label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* State of Supply input */}
      <div className="w-full">
        <label className="block text-gray-700 text-sm md:text-base">
          State of Supply
        </label>
        <select
          name="stateOfSupply"
          value={invoice.stateOfSupply}
          onChange={handleInputChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select State</option>
          <option value="Kerala">Kerala</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          {/* Add more states as needed */}
        </select>
      </div>
    </div>
  );
};

export default InvoiceDetailsSection;
