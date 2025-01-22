import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransactionDetailsSkeleton: React.FC = () => {
  return (
    <div className="transaction-details">
      <div className="transaction-amount">
        <Skeleton width={150} height={40} />
      </div>
      <div className="transaction-merchant">
        <Skeleton width={120} height={25} />
      </div>
      <div className="transaction-date">
        <Skeleton width={100} height={20} />
      </div>

      <div className="transaction-card">
        <div className="transaction-status">
          <span>
            <Skeleton width={80} height={15} />
          </span>
        </div>
        <div className="transaction-method">
          <Skeleton width={140} height={20} />
        </div>
        <div className="transaction-total">
          <Skeleton width={90} height={25} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsSkeleton;
