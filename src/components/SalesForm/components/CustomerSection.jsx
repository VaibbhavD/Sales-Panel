import React from "react";
import { useSales } from "../../../Context/SalesContext";

const CustomerSection = () => {
  const { invoice, setInvoice } = useSales();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  return (
    <div className="lg:w-1/2 mb-4">
      {/* Flex container for Customer Name and Phone Number inputs */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        {/* Customer Name input */}
        <div className="w-full mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm md:text-base">
            Customer
          </label>
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={invoice.customer}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number input */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm md:text-base">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={invoice.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Billing Address input */}
      <div className="w-full">
        <label className="block text-gray-700 text-sm md:text-base">
          Billing Address
        </label>
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={invoice.billingAddress}
          onChange={handleInputChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CustomerSection;
