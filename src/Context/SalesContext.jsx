import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const useSales = () => {
  return useContext(SalesContext);
};

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
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
        quantity: null,
        unit: "Bags",
        price: null,
        discountPercent: 0,
        taxType: "None",
      },
    ],
    totalAmount: null,
    receivedAmount: 0,
    paymentType: "Cash",
    description: "",
  });

  const addSale = (invoiceDetails) => {
    console.log(invoiceDetails);
    setSales((prevSales) => [...prevSales, invoiceDetails]);
    console.log(sales);
    localStorage.setItem("Sales", JSON.stringify(invoiceDetails));
  };

  return (
    <SalesContext.Provider value={{ sales, addSale, invoice, setInvoice }}>
      {children}
    </SalesContext.Provider>
  );
};
