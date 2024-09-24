import { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon for deletion
import { useSales } from "../Context/SalesContext";

const ItemsTable = () => {
  const { invoice, setInvoice } = useSales();
  const [taxOptions] = useState(["GST", "VAT", "Service Tax", "None"]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][field] = value;

    // If discount percentage changes, calculate discount amount
    if (field === "discountPercent") {
      const discountAmount =
        (updatedItems[index].price * updatedItems[index].quantity * value) /
        100;
      updatedItems[index].discountAmount = discountAmount;
    }

    // Calculate new tax amount based on taxType
    if (field === "taxType") {
      updatedItems[index].taxAmount = calculateTax(
        updatedItems[index].price * updatedItems[index].quantity,
        updatedItems[index].taxType
      );
    }

    setInvoice({ ...invoice, items: updatedItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          name: "",
          quantity: 1,
          unit: "Bags",
          price: 0,
          discountPercent: 0,
          discountAmount: 0,
          taxType: "None",
          taxAmount: 0,
        },
      ],
    });
  };

  const deleteItem = (index) => {
    const updatedItems = [...invoice.items];
    updatedItems.splice(index, 1);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const calculateTax = (totalBeforeTax, taxType) => {
    switch (taxType) {
      case "GST":
        return totalBeforeTax * 0.18; // GST = 18%
      case "VAT":
        return totalBeforeTax * 0.12; // VAT = 12%
      case "Service Tax":
        return totalBeforeTax * 0.15; // Service Tax = 15%
      default:
        return 0;
    }
  };

  const calculateTotal = (item) => {
    const discountAmount =
      item.discountAmount ||
      (item.price * item.quantity * item.discountPercent) / 100;
    const totalBeforeTax = item.price * item.quantity - discountAmount;
    const taxAmount = calculateTax(totalBeforeTax, item.taxType);
    return (totalBeforeTax + taxAmount).toFixed(2);
  };

  // Calculate total sales (quantity) and total amount
  const totalSales = invoice.items.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );
  const totalAmount = invoice.items.reduce(
    (acc, item) => acc + Math.round(Number(calculateTotal(item))),
    0
  );

  return (
    <div className="w-full">
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className=" border w-12">Sr. No</th>
            <th className="py-2 px-4 border w-20">Item</th>
            <th className="py-2 px-4 border w-16">Qty</th>
            <th className="py-2 px-4 border w-24">Unit</th>
            <th className="py-2 px-4 border w-32">Price</th>
            <th className="py-2 px-4 border w-48">Discount </th>
            <th className="py-2 px-4 border w-32">Tax</th>
            <th className="py-2 px-4 border w-32">Total</th>
            <th className="py-2 px-4 border w-10"></th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td className="border text-center">{index + 1}</td>
              <td className=" border">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="p-1 bg-transparent focus:outline-none"
                />
              </td>
              <td className=" border text-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="p-1 w-full bg-transparent text-center focus:outline-none"
                  min={0}
                />
              </td>
              <td className="border text-center">
                <select
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                  className="p-1 w-full bg-transparent focus:outline-none"
                >
                  <option value="Bags">Bags</option>
                  <option value="Packs">Packs</option>
                </select>
              </td>
              <td className=" border text-center">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="p-1 w-full bg-transparent text-center focus:outline-none"
                />
              </td>
              {/* Discount Section */}
              <td className=" border ">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center border-r-2">
                    <small className="text-gray-500">%</small>
                    <input
                      type="number"
                      value={item.discountPercent}
                      placeholder="%"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "discountPercent",
                          e.target.value
                        )
                      }
                      className="p-1 w-full bg-transparent focus:outline-none text-center"
                    />
                  </div>
                  <div className="text-center">
                    <small className="text-gray-500">Amount</small>
                    <input
                      type="number"
                      value={item.discountAmount}
                      placeholder="Amount"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "discountAmount",
                          e.target.value
                        )
                      }
                      className="p-1 w-full bg-transparent focus:outline-none text-center"
                    />
                  </div>
                </div>
              </td>
              {/* Tax Section */}
              <td className=" border text-center">
                <select
                  value={item.taxType}
                  onChange={(e) =>
                    handleItemChange(index, "taxType", e.target.value)
                  }
                  className="p-1 w-full bg-transparent focus:outline-none"
                >
                  {taxOptions.map((tax, i) => (
                    <option key={i} value={tax}>
                      {tax}
                    </option>
                  ))}
                </select>
              </td>
              {/* Total Amount */}
              <td className=" border text-center">{calculateTotal(item)}</td>
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
      {/* Add Item Button */}
      <div className="flex justify-between bg-gray-50 p-2">
        <button onClick={addItem} className=" text-blue-500 p-2 rounded">
          + Add Item
        </button>
        <div className="flex gap-5 justify-center items-center px-10">
          <p className="">Total Sales (Qty): {totalSales}</p>
          <p className="">Total Amount: {totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
