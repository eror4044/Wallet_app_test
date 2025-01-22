import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../data/data.json");
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    address: {
      street: "Main St",
      suite: "Apt. 101",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: "40.7128",
        lng: "-74.0060",
      },
    },
    company: {
      name: "John's Tech",
      catchPhrase: "Innovate your future",
      bs: "technology solutions",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    email: "janesmith@example.com",
    phone: "234-567-8901",
    website: "janesmith.com",
    address: {
      street: "Park Ave",
      suite: "Suite 202",
      city: "Los Angeles",
      zipcode: "90001",
      geo: {
        lat: "34.0522",
        lng: "-118.2437",
      },
    },
    company: {
      name: "Smith Innovations",
      catchPhrase: "Empowering the world",
      bs: "business strategies",
    },
  },
  {
    id: "3",
    name: "Alice Johnson",
    username: "alicej",
    email: "alicej@example.com",
    phone: "345-678-9012",
    website: "alicejohnson.org",
    address: {
      street: "Broadway",
      suite: "Apt. 303",
      city: "Chicago",
      zipcode: "60601",
      geo: {
        lat: "41.8781",
        lng: "-87.6298",
      },
    },
    company: {
      name: "Johnson Tech",
      catchPhrase: "Future-ready solutions",
      bs: "software development",
    },
  },
  {
    id: "4",
    name: "Bob Williams",
    username: "bobw",
    email: "bobw@example.com",
    phone: "456-789-0123",
    website: "bobwilliams.net",
    address: {
      street: "5th Ave",
      suite: "Suite 404",
      city: "San Francisco",
      zipcode: "94102",
      geo: {
        lat: "37.7749",
        lng: "-122.4194",
      },
    },
    company: {
      name: "Williams Enterprises",
      catchPhrase: "Innovate. Build. Deliver.",
      bs: "enterprise solutions",
    },
  },
  {
    id: "5",
    name: "Chris Brown",
    username: "chrisb",
    email: "chrisb@example.com",
    phone: "567-890-1234",
    website: "chrisbrown.co",
    address: {
      street: "Elm St",
      suite: "Apt. 505",
      city: "Houston",
      zipcode: "77001",
      geo: {
        lat: "29.7604",
        lng: "-95.3698",
      },
    },
    company: {
      name: "Brown Innovations",
      catchPhrase: "Redefining technology",
      bs: "AI solutions",
    },
  },
  {
    id: "6",
    name: "Emily Davis",
    username: "emilyd",
    email: "emilyd@example.com",
    phone: "678-901-2345",
    website: "emilydavis.io",
    address: {
      street: "Pine St",
      suite: "Suite 606",
      city: "Seattle",
      zipcode: "98101",
      geo: {
        lat: "47.6062",
        lng: "-122.3321",
      },
    },
    company: {
      name: "Davis Solutions",
      catchPhrase: "Simplifying the complex",
      bs: "cloud computing",
    },
  },
  {
    id: "7",
    name: "Michael Wilson",
    username: "mikew",
    email: "mikew@example.com",
    phone: "789-012-3456",
    website: "michaelwilson.com",
    address: {
      street: "Oak St",
      suite: "Apt. 707",
      city: "Austin",
      zipcode: "73301",
      geo: {
        lat: "30.2672",
        lng: "-97.7431",
      },
    },
    company: {
      name: "Wilson Innovations",
      catchPhrase: "Innovation through collaboration",
      bs: "data science",
    },
  },
  {
    id: "8",
    name: "Sarah Lee",
    username: "sarahlee",
    email: "sarahlee@example.com",
    phone: "890-123-4567",
    website: "sarahlee.me",
    address: {
      street: "Cedar St",
      suite: "Suite 808",
      city: "San Diego",
      zipcode: "92101",
      geo: {
        lat: "32.7157",
        lng: "-117.1611",
      },
    },
    company: {
      name: "Lee Enterprises",
      catchPhrase: "Transforming the future",
      bs: "logistics",
    },
  },
  {
    id: "9",
    name: "David Martinez",
    username: "davidm",
    email: "davidm@example.com",
    phone: "901-234-5678",
    website: "davidmartinez.info",
    address: {
      street: "Maple St",
      suite: "Apt. 909",
      city: "Phoenix",
      zipcode: "85001",
      geo: {
        lat: "33.4484",
        lng: "-112.0740",
      },
    },
    company: {
      name: "Martinez Corp",
      catchPhrase: "Think big. Act bigger.",
      bs: "marketing strategies",
    },
  },
  {
    id: "10",
    name: "Jessica White",
    username: "jessicaw",
    email: "jessicaw@example.com",
    phone: "012-345-6789",
    website: "jessicawhite.biz",
    address: {
      street: "Birch St",
      suite: "Suite 1010",
      city: "Miami",
      zipcode: "33101",
      geo: {
        lat: "25.7617",
        lng: "-80.1918",
      },
    },
    company: {
      name: "White Tech",
      catchPhrase: "Empowering progress",
      bs: "IT consulting",
    },
  },
];
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

app.get("/users/:id?", (req, res) => {
  const userId = req.params.id || "";

  const searchUsers = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    const matchingUsers = query
      ? mockUsers.filter((user) => {
          return (
            user.id.includes(lowerCaseQuery) ||
            user.name.toLowerCase().includes(lowerCaseQuery) ||
            user.email.toLowerCase().includes(lowerCaseQuery)
          );
        })
      : mockUsers;

    return matchingUsers;
  };

  const users = searchUsers(userId);

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404).json({ error: "No users found" });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
