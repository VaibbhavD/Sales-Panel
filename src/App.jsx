// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesForm from "./components/SalesForm";
import { SalesProvider } from "./Context/SalesContext";

function App() {
  return (
    <SalesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-sale" element={<SalesForm />} />
        </Routes>
      </Router>
    </SalesProvider>
  );
}

export default App;
