import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SalesForm from "./components/SalesForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-sale" element={<SalesForm />} />
      </Routes>
    </Router>
  );
}

export default App;
