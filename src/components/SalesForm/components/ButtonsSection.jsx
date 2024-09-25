import React from "react";
import { useSales } from "../../../Context/SalesContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ButtonsSection = () => {
  const { invoice, addSale, setIsModalOpen } = useSales();
  const navigate = useNavigate();

  const isFormValid =
    invoice.customer &&
    invoice.totalAmount != null &&
    invoice.totalAmount != 0 &&
    invoice.receivedAmount != null &&
    invoice.invoiceNumber;

  console.log(invoice);

  return (
    <div className="flex justify-end space-x-4">
      {" "}
      {/* Align buttons to the right and add spacing */}
      <button
        onClick={() => (
          setIsModalOpen(true), toast.success("Invoice Genrated")
        )}
        disabled={!isFormValid}
        className={`py-2 px-4 rounded-lg ${
          isFormValid ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
      >
        Generate Invoice
      </button>
      <button
        onClick={() => (
          addSale(invoice), toast.success("Invoice Saved"), navigate("/")
        )}
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
