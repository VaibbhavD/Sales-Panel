// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard";
import SalesFormPage from "./Pages/SalesForm";
import { useSales } from "./Context/SalesContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
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
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add-sale" element={<SalesFormPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
