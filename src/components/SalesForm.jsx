import React, { useState, useEffect } from "react";
import CustomerSection from "./CustomerSection";
import InvoiceDetailsSection from "./InvoiceDetailsSection";
import ItemsTable from "./ItemsTable";
import BottomSection from "./BottomSection";
import ButtonsSection from "./ButtonsSection";
import { useSales } from "../Context/SalesContext";

const SalesForm = () => {
  const { invoice, setInvoice } = useSales();

  // Save invoice to localStorage whenever it updates
  // useEffect(() => {
  //   localStorage.setItem("invoice", JSON.stringify(invoice));
  // }, [invoice]);

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

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-left text-gray-800 mb-6">Sales</h1>

      <div className="flex justify-between mb-2">
        <CustomerSection />
        <InvoiceDetailsSection invoice={invoice} setInvoice={setInvoice} />
      </div>

      <ItemsTable />

      <BottomSection
        invoice={invoice}
        setInvoice={setInvoice}
        handleInputChange={handleInputChange}
      />

      <ButtonsSection />
    </div>
  );
};

export default SalesForm;
