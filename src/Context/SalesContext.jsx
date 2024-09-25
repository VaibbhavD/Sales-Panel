import React, { createContext, useContext, useState, useEffect } from "react";

const SalesContext = createContext();

export const useSales = () => {
  return useContext(SalesContext);
};

export const SalesProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem("Sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });

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
        itemtotalAmount: null,
        FinalAmout: null,
      },
    ],
    totalAmount: null,
    receivedAmount: null,
    paymentType: "Cash",
    description: "",
  });

  const addSale = (invoiceDetails) => {
    console.log(invoiceDetails);
    setSales((prevSales) => {
      const updatedSales = [...prevSales, invoiceDetails];
      localStorage.setItem("Sales", JSON.stringify(updatedSales));
      return updatedSales;
    });
    resetInvoice();
  };

  const deleteSale = (index) => {
    setSales((prevSales) => {
      const updatedSales = prevSales.filter((_, i) => i !== index);
      localStorage.setItem("Sales", JSON.stringify(updatedSales));
      return updatedSales;
    });
  };

  const GetSaleData = (Data) => {
    setSales(Data);
  };

  const resetInvoice = () => {
    setInvoice({
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
  };

  return (
    <SalesContext.Provider
      value={{
        sales,
        addSale,
        invoice,
        setInvoice,
        GetSaleData,
        deleteSale,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
