import axios from "axios";
import { useState, useEffect } from "react";
import TransactionsList from "../components/TransactionsList";
import { Transaction } from "../interfaces/Transaction";
import { SmBox } from "../shared/sm_box";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}
export const Dashboard: React.FC<Props> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`/api/transactions`)
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading transactions:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="dashboard">
      <div className="info-wrapper">
        <SmBox>
          <p className="title1">Card Balance</p>
          <h2>$17.30</h2>
          <p className="">$1,722.30 Available</p>
        </SmBox>
        <SmBox className={"div3"}>
          <p className="title1">Daily Points</p>
          <p className="">456K</p>
        </SmBox>
        <SmBox className={"div4"}>
          <div className="wrapper">
            <div>
              <p className="title1">No Payment Due</p>
              <p>You`re paid your September balance</p>
            </div>
            <div className="mark-wrapper">
              <div className="mark">
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </div>
            </div>
          </div>
        </SmBox>
      </div>
      <TransactionsList transactions={transactions} loading={loading} />
    </div>
  );
};
