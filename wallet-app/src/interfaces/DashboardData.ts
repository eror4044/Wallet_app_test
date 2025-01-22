import { Transaction } from "./Transaction";

export interface DashboardData {
  cardLimit: number;
  balance: string;
  available: string;
  dailyPoints: string;
  transactions: Transaction[];
}
