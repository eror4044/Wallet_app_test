import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { calculateDailyPoints } from "./utils";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "./data/data.json");
interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: string; // Credit or Payment
  status: string;
  date: string;
  authorizedUser: string;
}
const CARD_LIMIT = 1500;

const getTransactions = (): Transaction[] => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

app.get("/api/dashboard", (req, res) => {
  try {
    const transactions = getTransactions();
    const today = new Date();
    const points = calculateDailyPoints(today);
    const balance = transactions
      .filter((t) => t.type === "Credit")
      .reduce((acc, t) => acc + t.amount, 0);

    const available = CARD_LIMIT - balance;

    const recentTransactions = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    res.json({
      cardLimit: CARD_LIMIT,
      balance: balance.toFixed(2),
      available: available.toFixed(2),
      dailyPoints: points,
      transactions: recentTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("Failed to fetch dashboard data");
  }
});

app.get("/api/transactions", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/transactions/:id", (req, res) => {
  const transactionId = parseInt(req.params.id, 10);

  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    const transactions = JSON.parse(data);
    const transaction = transactions.find((t: any) => t.id === transactionId);

    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    } else {
      res.json(transaction);
    }
  });
});

app.delete("/api/transactions/:id", (req, res) => {
  const transactionId = parseInt(req.params.id, 10);
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    let transactions = JSON.parse(data);
    transactions = transactions.filter((t: any) => t.id !== transactionId);

    fs.writeFile(dataPath, JSON.stringify(transactions, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error saving data");
        return;
      }
      res.send({ success: true });
    });
  });
});

app.get("/api/paymentStatus", (req, res) => {
  const today = new Date();
  const lastPaymentDate = new Date("2025-1-01");
  const isPaid = today < new Date(lastPaymentDate.setMonth(lastPaymentDate.getMonth() + 1));

  res.json({
    status: isPaid ? "No Payment Due" : "Payment Due",
    month: isPaid ? "September" : "October",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
