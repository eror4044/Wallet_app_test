export interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  authorizedUser: string;
  image: string;
}
