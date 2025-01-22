import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="info-wrapper">
        <div className="smBox">
          <p className="title1">
            <Skeleton width={100} height={20} />
          </p>
          <h2>
            <Skeleton width={80} height={30} />
          </h2>
          <p className="small">
            <Skeleton width={120} height={15} />
          </p>
        </div>
        <div className="smBox">
          <p className="title1">
            <Skeleton width={100} height={20} />
          </p>
          <p>
            <Skeleton width={60} height={30} />
          </p>
        </div>
      </div>
      <div className="transactions-list-wrapper-skeleton">
        <h2>
          <Skeleton width={180} />
        </h2>
        <Skeleton count={5} height={70} style={{ marginBottom: "16px" }} />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
