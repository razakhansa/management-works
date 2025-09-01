const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "register",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send("Database query error");
    res.json(results);
  });
});
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).send("Database insert error");
      res.status(201).send("User created");
    }
  );
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send("Database delete error");
    res.send("User deleted");
  });
});
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  db.query(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [username, password, id],
    (err, results) => {
      if (err) return res.status(500).send("Database update error");
      res.send("User updated");
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
