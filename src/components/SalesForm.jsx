import React, { useState, useEffect } from "react";
import CustomerSection from "./CustomerSection";
import InvoiceDetailsSection from "./InvoiceDetailsSection";
import ItemsTable from "./ItemsTable";
import BottomSection from "./BottomSection";
import ButtonsSection from "./ButtonsSection";

const SalesForm = () => {
  const [invoice, setInvoice] = useState({
    customer: "",
    phone: "",
    billingAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    stateOfSupply: "",
    items: [
      {
        name: "",
        quantity: 1,
        unit: "Bags",
        price: 0,
        discountPercent: 0,
        discountAmount: 0,
        taxPercent: 0,
        taxAmount: 0,
      },
    ],
    totalAmount: 0,
    receivedAmount: 0,
    paymentType: "Cash",
    description: "",
  });

  // Load saved data from local storage on component mount
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    if (savedInvoices.length > 0) {
      console.log("Saved invoices loaded:", savedInvoices);
    }
  }, []);

  // Save invoice to local storage
  const saveInvoice = () => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    savedInvoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));
    console.log("Invoice saved to local storage:", invoice);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Form Sections */}
      <h1 className="text-3xl font-bold text-left text-gray-800 mb-6">Sales</h1>

      <div className="flex justify-between mb-2">
        <CustomerSection invoice={invoice} setInvoice={setInvoice} />
        <InvoiceDetailsSection invoice={invoice} setInvoice={setInvoice} />
      </div>

      <ItemsTable invoice={invoice} setInvoice={setInvoice} />
      <BottomSection invoice={invoice} setInvoice={setInvoice} />

      <ButtonsSection saveInvoice={saveInvoice} invoice={invoice} />
    </div>
  );
};

export default SalesForm;
