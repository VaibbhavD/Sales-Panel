// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesForm from "./components/SalesForm";
import { useSales } from "./Context/SalesContext";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { GetSaleData, isModalOpen } = useSales();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Sales"));
    if (data) {
      GetSaleData(data);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-sale" element={<SalesForm />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
