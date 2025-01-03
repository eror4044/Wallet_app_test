import { useEffect } from "react";
import { SmBox } from "../shared/sm_box";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import TransactionsList from "../components/TransactionsList";
import {
  fetchDashboardData,
  fetchPaymentStatus,
} from "../store/transactions/transactionsThunks";
import DashboardSkeleton from "../components/skeleton/DashboardSkeleton";

interface Props {}
export const Dashboard: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardData, paymentStatus, loading } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchDashboardData())
      .unwrap()
      .then(() => {
        dispatch(fetchPaymentStatus());
      });
  }, [dispatch]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard">
      <div className="info-wrapper">
        <SmBox>
          <p className="title1">Card Balance</p>
          <h2>${dashboardData?.balance}</h2>
          <p className="">${dashboardData.available} Available</p>
        </SmBox>
        <SmBox className={"div3"}>
          <p className="title1">Daily Points</p>
          <p className="">{dashboardData.dailyPoints}K</p>
        </SmBox>
        <SmBox className={"div4"}>
          <div className="wrapper">
            <div>
              <p className="title1">No Payment Due</p>
              <p>{loading ? "Loading..." : paymentStatus.month}</p>
            </div>
            <div className="mark-wrapper">
              <div className="mark">
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </div>
            </div>
          </div>
        </SmBox>
      </div>
      <TransactionsList transactions={dashboardData.transactions} />
    </div>
  );
};
