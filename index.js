const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const app = express();
const db = new sqlite3.Database("./mumin_app.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hadith API" });
});

app.get("/create", (req, res) => {
  const dropTablesQuery = `
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS drawer;
    DROP TABLE IF EXISTS hadith_for_category;
    DROP TABLE IF EXISTS pin;
    DROP TABLE IF EXISTS subcategory;
    DROP TABLE IF EXISTS writers;
  `;

  db.exec(dropTablesQuery, (err) => {
    if (err) {
      console.error("Error dropping tables:", err.message);
      res.status(500).json({ message: "Failed to drop tables", error: err.message });
    } else {
      console.log("Tables dropped successfully.");
      res.json({ message: "Tables dropped successfully" });
    }
  });
});

app.listen(3131, () => {
  console.log("Server is running on port 3133");
});
