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
    invoice.totalAmount !== 0 &&
    invoice.receivedAmount != null &&
    invoice.invoiceNumber;

  return (
    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Align buttons to the right and add spacing */}
      <button
        onClick={() => (
          setIsModalOpen(true), toast.success("Invoice Generated")
        )}
        disabled={!isFormValid}
        className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
          isFormValid
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-300"
        }`}
      >
        Generate Invoice
      </button>
      <button
        onClick={() => (
          addSale(invoice), toast.success("Invoice Saved"), navigate("/")
        )}
        disabled={!isFormValid}
        className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
          isFormValid
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300"
        }`}
      >
        Save Invoice
      </button>
    </div>
  );
};

export default ButtonsSection;
