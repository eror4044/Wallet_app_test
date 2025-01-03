import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransactionListSkeleton: React.FC = () => {
  return (
    <div className="transactions-list">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div className="transaction-item" key={index}>
            <div className="transaction-icon">
              <Skeleton circle height={50} width={50} />
            </div>
            <div className="transaction-details">
              <p className="title">
                <Skeleton width={120} />
              </p>
              <p className="small">
                <Skeleton width={80} />
              </p>
            </div>
            <div className="transaction-amount">
              <Skeleton width={50} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TransactionListSkeleton;
