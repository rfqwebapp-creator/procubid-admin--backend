// routes/organization.js

const express = require("express");
const router = express.Router();
const db = require("../config/db"); // mysql connection

console.log("ORGANIZATION ROUTES LOADED");

// GET all organizations
router.get("/", (req, res) => {
  const sql = "SELECT * FROM organizations ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("FETCH ERROR:", err);
      return res.status(500).json({ error: "DB fetch error" });
    }

    return res.json(result);
  });
});


router.post("/add", async (req, res) => {
  console.log("ADD ORGANIZATION HIT");
  console.log("BODY:", req.body);
  try {
    const {
      company_name,
      email,
      role_type,
      sector,
      region,
      status,
    } = req.body;

    const sql = `
      INSERT INTO organizations 
      (company_name, email, role_type, sector, region, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [company_name, email, role_type, sector, region, status],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "DB error" });
        }
        res.json({ message: "Organization added" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;