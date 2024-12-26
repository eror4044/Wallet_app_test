import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Transaction } from "../interfaces/Transaction";

const TransactionDetails: React.FC = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/transactions/${id}`)
      .then((response) => {
        setTransaction(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading transaction details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading transaction details...</p>;

  return transaction ? (
    <div className="transaction-details">
      <div className="transaction-amount">${transaction.amount.toFixed(2)}</div>
      <div className="transaction-merchant">{transaction.name}</div>
      <div className="transaction-date">{transaction.date}</div>

      <div className="transaction-card">
        <div className="transaction-status">
          <span>Status:</span> {transaction.status}
        </div>
        <div className="transaction-method">{transaction.authorizedUser}</div>
        <div className="transaction-total">
          <span>Total</span>
          <span>${transaction.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  ) : (
    <p className="not-found">Transaction not found</p>
  );
};

export default TransactionDetails;
