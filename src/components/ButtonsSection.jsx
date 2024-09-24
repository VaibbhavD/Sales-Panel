import React from "react";
import { useSales } from "../Context/SalesContext";

const ButtonsSection = () => {
  const { invoice, addSale } = useSales();

  const isFormValid =
    invoice.customer && invoice.totalAmount != 0 && invoice.invoiceNumber;

  console.log(invoice);

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
        onClick={() => addSale(invoice)}
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
