import { useEffect } from "react";

const InvoiceDetailsSection = ({ invoice, setInvoice }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  useEffect(() => {
    const generatedInvoiceNumber = `INV-${Math.floor(
      1000 + Math.random() * 9000
    )}`; // e.g., INV-1234
    setInvoice((prev) => ({ ...prev, invoiceNumber: generatedInvoiceNumber }));
  }, [setInvoice]);

  return (
    <div className="w-full mb-4">
      {/* Flex container for Invoice Number and Invoice Date inputs */}
      <div className="flex justify-end mb-4 mr-5">
        {/* Invoice Number input */}
        <div className="mr-4">
          <label className="block text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
            className="border p-2 rounded-lg mb-4"
            disabled
          />
        </div>

        {/* Invoice Date input */}
        <div className="">
          <label className="block text-gray-700">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
            className=" border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* State of Supply input */}
      <div className="grid justify-end mr-5">
        <label className="block text-gray-700">State of Supply</label>
        <select
          name="stateOfSupply"
          value={invoice.stateOfSupply}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-full "
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
