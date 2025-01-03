import TransactionItem from "./TransactionItem";
import { Transaction } from "../interfaces/Transaction";

interface Props {
  transactions: Transaction[];
}

const TransactionsList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="transactions-list-wrapper">
      <h2>Latest Transactions</h2>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
