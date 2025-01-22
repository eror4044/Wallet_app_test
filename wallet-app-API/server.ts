import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { calculateDailyPoints } from "./utils.js";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../data/data.json");
const mockUsers = [
  {
    id: "1",
    username: "johndoe",
    email: "johndoe@example.com",
  },
  {
    id: "2",
    username: "janesmith",
    email: "janesmith@example.com",
  },
  {
    id: "3",
    username: "alicej",
    email: "alicej@example.com",
  },
  {
    id: "4",
    username: "bobw",
    email: "bobw@example.com",
  },
];

const mockAccounts = [
  {
    id: "101",
    name: "Savings Account",
    email: "savings@example.com",
    owner: mockUsers[0],
  },
  {
    id: "102",
    name: "Checking Account",
    email: "checking@example.com",
    owner: mockUsers[1],
  },
  {
    id: "103",
    name: "Business Account",
    email: "business@example.com",
    owner: mockUsers[2],
  },
  {
    id: "104",
    name: "Joint Account",
    email: "joint@example.com",
    owner: mockUsers[3],
  },
];
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

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  const mockUser = {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    accessToken: "mockAccessToken",
    refreshToken: "mockRefreshToken",
  };

  if (username === "admin" && password === "admin123") {
    res.json({
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
      accessToken: mockUser.accessToken,
      refreshToken: mockUser.refreshToken,
    });
  } else {
    res
      .status(401)
      .json({ error: "Invalid username or password", operation: "login" });
  }
});

app.get("/accounts/:id?", (req, res) => {
  const accountId = req.params.id || "";

  const searchAccounts = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    const matchingAccounts = query
      ? mockAccounts.filter((account) => {
          return (
            account.id.includes(lowerCaseQuery) ||
            account.name.toLowerCase().includes(lowerCaseQuery) ||
            account.email.toLowerCase().includes(lowerCaseQuery)
          );
        })
      : mockUsers;

    return matchingAccounts;
  };

  const accounts = searchAccounts(accountId);

  if (accounts.length > 0) {
    res.json(accounts);
  } else {
    res.json([]);
  }
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
  const isPaid =
    today < new Date(lastPaymentDate.setMonth(lastPaymentDate.getMonth() + 1));

  res.json({
    status: isPaid ? "No Payment Due" : "Payment Due",
    month: isPaid ? "September" : "October",
  });
});

app.put("/accounts/:id?", (req: any, res: any) => {
  console.log(req.params);

  const { id } = req.params;
  const updatedData = req.body;
  const accountIndex = mockAccounts.findIndex((account) => account.id === id);

  if (accountIndex === -1) {
    return res
      .status(200)
      .json({ message: "Account not found", success: false });
  }

  mockAccounts[accountIndex] = {
    ...mockAccounts[accountIndex],
    ...updatedData,
  };

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
