const BottomSection = ({ invoice, setInvoice }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  return (
    <div className="flex justify-between mb-8">
      {/* Left Side - Payment Type and Description */}
      <div className="w-1/2 pr-6">
        <label className="block text-gray-600 mb-2 text-sm font-medium">
          Payment Type
        </label>
        <select
          name="paymentType"
          value={invoice.paymentType}
          onChange={handleInputChange}
          className="p-3 bg-gray-50 rounded-lg shadow-sm w-full mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>

        <label className="block text-gray-600 mb-2 text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={invoice.description}
          onChange={handleInputChange}
          className="p-3 bg-gray-50 rounded-lg shadow-sm w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side - Total Amount Breakdown */}
      <div className="w-1/2 grid justify-end pl-6">
        <div className="mb-4 flex gap-4 items-center">
          <label className="block text-gray-600 mb-2 text-sm font-medium">
            Total Amount
          </label>
          <div className="p-3 w-20 bg-gray-100 text-gray-800 rounded-lg shadow-inner">
            {invoice.totalAmount ? `₹ ${invoice.totalAmount}` : "₹ 0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
