import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon for deletion
import { useSales } from "../../../Context/SalesContext";

const ItemsTable = () => {
  const { invoice, setInvoice } = useSales();
  const [taxOptions] = useState([
    "GST 18%",
    "VAT 12%",
    "Service Tax 15%",
    "None",
  ]);

  // Function to calculate the total amount of the invoice
  const calculateTotalAmount = () => {
    const total = invoice.items.reduce((total, item) => {
      return total + Number(item.FinalAmount);
    }, 0);
    return total;
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][field] = value;

    const quantity = Number(updatedItems[index].quantity) || 0;
    const price = Number(updatedItems[index].price) || 0;
    const discountPercent = Number(updatedItems[index].discountPercent) || 0;

    // Calculate item total (price * quantity)
    updatedItems[index].itemtotalAmount = quantity * price;

    // Calculate discount amount
    const discountAmount =
      (updatedItems[index].itemtotalAmount * discountPercent) / 100;

    // Calculate tax amount based on taxType
    const totalBeforeTax = updatedItems[index].itemtotalAmount - discountAmount;
    const taxAmount = calculateTax(totalBeforeTax, updatedItems[index].taxType);

    // Calculate FinalAmount (total after discount + tax)
    updatedItems[index].FinalAmount = totalBeforeTax + taxAmount;

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  useEffect(() => {
    const newTotalAmount = calculateTotalAmount();
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      totalAmount: newTotalAmount,
    }));
  }, [invoice.items]);

  const addItem = () => {
    const newItem = {
      name: "",
      quantity: 1,
      unit: "Bags",
      price: 0,
      discountPercent: 0,
      taxType: "None",
      itemtotalAmount: 0,
      FinalAmount: 0,
    };

    const updatedItems = [...invoice.items, newItem];
    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  const deleteItem = (index) => {
    const updatedItems = [...invoice.items];
    updatedItems.splice(index, 1);

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  const calculateTax = (totalBeforeTax, taxType) => {
    switch (taxType) {
      case "GST 18%":
        return totalBeforeTax * 0.18; // GST = 18%
      case "VAT 12%":
        return totalBeforeTax * 0.12; // VAT = 12%
      case "Service Tax 15%":
        return totalBeforeTax * 0.15; // Service Tax = 15%
      default:
        return 0;
    }
  };

  // Calculate total sales (quantity)
  const totalSales = invoice.items.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto flex-grow">
        <table className="w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-xs sm:text-sm md:text-base">
              <th className="border w-12">Sr. No</th>
              <th className="py-2 px-2 sm:px-4 border w-20">Item</th>
              <th className="py-2 px-2 sm:px-4 border w-16">Qty</th>
              <th className="py-2 px-2 sm:px-4 border w-24">Unit</th>
              <th className="py-2 px-2 sm:px-4 border w-32">Price</th>
              <th className="py-2 px-2 sm:px-4 border w-32">Item Total</th>
              <th className="py-2 px-2 sm:px-4 border w-48">Discount (%)</th>
              <th className="py-2 px-2 sm:px-4 border w-32">Tax</th>
              <th className="py-2 px-2 sm:px-4 border w-32">Final Amount</th>
              <th className="border w-10"></th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="text-xs sm:text-sm md:text-base">
                <td className="border text-center">{index + 1}</td>
                <td className="border">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="p-2 w-full min-w-[100px] bg-transparent focus:outline-none" // Adjusted
                  />
                </td>
                <td className="border text-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="p-1 w-full min-w-[60px] bg-transparent text-center focus:outline-none" // Adjusted
                    min={0}
                  />
                </td>
                <td className="border text-center">
                  <select
                    value={item.unit}
                    onChange={(e) =>
                      handleItemChange(index, "unit", e.target.value)
                    }
                    className="p-1 w-full min-w-[80px] bg-transparent focus:outline-none" // Adjusted
                  >
                    <option value="Bags">Bags</option>
                    <option value="Packs">Packs</option>
                  </select>
                </td>
                <td className="border text-center">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className="p-1 w-full min-w-[80px] bg-transparent text-center focus:outline-none" // Adjusted
                  />
                </td>
                <td className="border text-center">{item.itemtotalAmount}</td>
                <td className="border text-center">
                  <input
                    type="number"
                    value={item.discountPercent}
                    onChange={(e) =>
                      handleItemChange(index, "discountPercent", e.target.value)
                    }
                    className="p-1 w-full min-w-[60px] bg-transparent text-center focus:outline-none" // Adjusted
                  />
                </td>
                <td className="border text-center">
                  <select
                    value={item.taxType}
                    onChange={(e) =>
                      handleItemChange(index, "taxType", e.target.value)
                    }
                    className="p-1 w-full min-w-[80px] bg-transparent focus:outline-none" // Adjusted
                  >
                    {taxOptions.map((tax, i) => (
                      <option key={i} value={tax}>
                        {tax}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border text-center">{item.FinalAmount}</td>
                <td className="border text-center">
                  <button
                    onClick={() => deleteItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixed Add Item Button and Total Sales Section */}
      <div className="bg-gray-50 p-2 flex justify-between items-center">
        <button
          onClick={addItem}
          className="text-blue-500 p-2 rounded text-sm sm:text-base"
        >
          + Add Item
        </button>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center items-center">
          <p className="text-xs sm:text-sm">Total Sales (Qty): {totalSales}</p>
          <p className="text-xs sm:text-sm">
            Total Amount: {invoice.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
