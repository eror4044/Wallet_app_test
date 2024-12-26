import React from "react";
import { Link } from "react-router-dom";
import { Transaction } from "../interfaces/Transaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  return (
    <div className="transaction-item">
      <div className="image-wrapper">
        <div className="image">
          <FontAwesomeIcon icon={faThumbsUp} size="xl" />
        </div>
      </div>

      <div className="details">
        <div className="header">
          <div>
            <h4>{transaction.name}</h4>
          </div>
          <div>
            <h4>{transaction.amount}</h4>
          </div>
        </div>
        <div className="content">
          <div>
            <p className="subtitle1">Status: {transaction.status}</p>
            <p className="subtitle1">Date: {transaction.date}</p>
          </div>
          <div>
            <p className="percent">3%</p>
          </div>
        </div>
      </div>
      <div className="chevron-right">
        <Link to={`/transaction/${transaction.id}`} className="details-link">
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </Link>
      </div>
    </div>
  );
};

export default TransactionItem;
