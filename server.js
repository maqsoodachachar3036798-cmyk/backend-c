
// Express and CORS packages
const express = require("express");
const cors = require("cors");

// Express application
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary users array
let users = [];
let nextId = 1;

// ==========================
// 1. POST API - Create User
// ==========================

app.post("/api/users", (req, res) => {
  const { userName, contactNumber, address } = req.body;

  // Validation
  if (!userName || !contactNumber || !address) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  // Create new user
  const newUser = {
    id: nextId++,
    userName,
    contactNumber,
    address
  };

  // Save user
  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// ==========================
// 2. GET API - Get All Users
// ==========================

app.get("/api/users", (req, res) => {
  res.status(200).json({
    message: "Users fetched successfully",
    users: users
  });
});

// ==========================
// GET API - Get Single User
// ==========================

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    message: "User found successfully",
    user: user
  });
});

// ==========================
// 3. PUT API - Update User
// ==========================

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const { userName, contactNumber, address } = req.body;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (!userName || !contactNumber || !address) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  user.userName = userName;
  user.contactNumber = contactNumber;
  user.address = address;

  res.status(200).json({
    message: "User updated successfully",
    user: user
  });
});

// ==========================
// 4. DELETE API - Delete User
// ==========================

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });
});

// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
