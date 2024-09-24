const ButtonsSection = ({ saveInvoice, invoice }) => {
  const isFormValid =
    invoice.customer && invoice.totalAmount && invoice.invoiceNumber;

  return (
    <div className="flex justify-end space-x-4">
      {" "}
      {/* Align buttons to the right and add spacing */}
      <button
        onClick={() => alert("Invoice generated")}
        disabled={!isFormValid}
        className={`py-2 px-4 rounded-lg ${
          isFormValid ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
      >
        Generate Invoice
      </button>
      <button
        onClick={saveInvoice}
        disabled={!isFormValid}
        className={`py-2 px-4 rounded-lg ${
          isFormValid ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        Save Invoice
      </button>
    </div>
  );
};

export default ButtonsSection;
