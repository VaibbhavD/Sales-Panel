import React, { useState, useEffect } from "react";
import CustomerSection from "../components/SalesForm/components/CustomerSection";
import InvoiceDetailsSection from "../components/SalesForm/components/InvoiceDetailsSection";
import ItemsTable from "../components/SalesForm/components/ItemsTable";
import BottomSection from "../components/SalesForm/components/BottomSection";
import ButtonsSection from "../components/SalesForm/components/ButtonsSection";
import { useSales } from "../Context/SalesContext";
import Invoice from "../components/Invoice/Invoice";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const SalesFormPage = () => {
  const { invoice, setInvoice, isModalOpen, setisModalOpen } = useSales();
  const navigate = useNavigate();

  // Tax calculation helper function
  const calculateTax = (totalBeforeTax, taxType) => {
    switch (taxType) {
      case "GST":
        return totalBeforeTax * 0.18;
      case "VAT":
        return totalBeforeTax * 0.12;
      case "Service Tax":
        return totalBeforeTax * 0.15;
      default:
        return 0;
    }
  };

  // Update totalAmount when items are modified
  useEffect(() => {
    const newTotalAmount = invoice.items.reduce((total, item) => {
      const discountAmount =
        (item.price * item.quantity * item.discountPercent) / 100;
      const totalBeforeTax = item.price * item.quantity - discountAmount;
      const taxAmount = calculateTax(totalBeforeTax, item.taxType);
      return total + (totalBeforeTax + taxAmount);
    }, 0);

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      totalAmount: newTotalAmount.toFixed(2),
    }));
  }, [invoice.items]);

  // Update receivedAmount, paymentType, description based on user input
  const handleInputChange = (field, value) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="p-4 bg-gray-100 min-h-screen ">
        <FaArrowLeft
          className="text-lg text-gray-500 cursor-pointer hover:text-black"
          onClick={() => navigate(-1)}
        />
        <p className="text-3xl font-bold text-left text-gray-800 mb-6">Sales</p>

        <div className="flex flex-col md:flex-row justify-between mb-2 space-y-4 md:space-y-0 md:space-x-4 px-4">
          {/* Customer Section */}
          <div className="w-full md:w-1/2">
            <CustomerSection />
          </div>

          {/* Invoice Details Section */}
          <div className="w-full  md:w-1/2">
            <InvoiceDetailsSection invoice={invoice} setInvoice={setInvoice} />
          </div>
        </div>

        <ItemsTable />

        <BottomSection
          invoice={invoice}
          setInvoice={setInvoice}
          handleInputChange={handleInputChange}
        />

        <ButtonsSection />
        {isModalOpen && (
          <Invoice invoice={invoice} SetisModalOpen={setisModalOpen} />
        )}
      </div>
    </div>
  );
};

export default SalesFormPage;
