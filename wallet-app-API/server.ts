import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "data/data.json");

app.get("/api/transactions", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    res.send(JSON.parse(data));
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
