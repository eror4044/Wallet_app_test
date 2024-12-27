import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/main.scss';
import TransactionDetails from "./pages/TransactionDetails";
import { Dashboard } from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
