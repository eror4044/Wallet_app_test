import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearTransaction } from "../store/slices/transactionsSlice";
import { AppDispatch, RootState } from "../store/store";
import { fetchTransactionById } from "../store/transactions/transactionsThunks";
import TransactionDetailsSkeleton from "../components/skeleton/TransactionDetailsSkeleton";

const TransactionDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { transaction, loading } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionById(id));
    }

    return () => {
      dispatch(clearTransaction());
    };
  }, [id, dispatch]);

  if (loading) {
    return <TransactionDetailsSkeleton />;
  }

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
