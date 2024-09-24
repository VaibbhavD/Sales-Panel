import React from "react";
import { useSales } from "../Context/SalesContext";

const CustomerSection = () => {
  const { invoice, setInvoice } = useSales();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  return (
    <div className="w-full mb-4">
      {/* Flex container for Customer Name and Phone Number inputs */}
      <div className="flex mb-4">
        {/* Customer Name input */}
        <div className=" mr-4">
          <label className="block text-gray-700">Customer</label>
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={invoice.customer}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Phone Number input */}
        <div className="">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={invoice.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Billing Address input */}
      <div className="">
        <label className="block text-gray-700">Billing Address</label>
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={invoice.billingAddress}
          onChange={handleInputChange}
          className="w-1/2 border p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default CustomerSection;
