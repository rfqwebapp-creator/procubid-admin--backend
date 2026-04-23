const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getOrganizationDetails } = require("../controllers/organizationController");

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

// ADD organization
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

        return res.json({ message: "Organization added" });
      }
    );
  } catch (err) {
    console.error("ADD ORGANIZATION ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  console.log("DELETE ORGANIZATION HIT, ID:", id);

  const sql = "DELETE FROM organizations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Delete failed",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    return res.json({
      success: true,
      message: "Organization deleted successfully",
    });
  });
});

// GET single organization full details
router.get("/:id/details", getOrganizationDetails);

module.exports = router;