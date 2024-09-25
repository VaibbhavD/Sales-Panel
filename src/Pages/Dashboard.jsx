import React from "react";
import Header from "../components/Dashboard/Header";
import Dashboard from "../components/Dashboard/Dashboard";

function DashboardPage() {
  return (
    <div className="bg-gray-100 px-2 py-2">
      <Header />
      <Dashboard />
    </div>
  );
}

export default DashboardPage;
