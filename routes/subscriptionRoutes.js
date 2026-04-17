const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all plans
router.get("/", (req, res) => {
  const sql = "SELECT * FROM subscription_plans ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("FETCH SUBSCRIPTION PLANS ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch plans",
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  });
});

// ADD new plan
router.post("/add", (req, res) => {
  console.log("ADD PLAN BODY:", req.body);

  const { name, price, billing, features, status } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  let duration = "30 days";

  if (billing === "Yearly") {
    duration = "365 days";
  }

  const enabled = status === "Active" ? 1 : 0;

  const sql = `
    INSERT INTO subscription_plans
    (name, price, billing, duration, features, status, enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, price, billing || "Monthly", duration, features || "", status || "Active", enabled],
    (err, result) => {
      if (err) {
        console.error("ADD SUBSCRIPTION PLAN ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add plan",
        });
      }

      return res.json({
        success: true,
        message: "Plan created successfully",
        id: result.insertId,
      });
    }
  );
});

// TOGGLE plan active/inactive
router.patch("/:id/toggle", (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  const status = enabled ? "Active" : "Inactive";

  const sql = `
    UPDATE subscription_plans
    SET enabled = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [enabled ? 1 : 0, status, id], (err, result) => {
    if (err) {
      console.error("TOGGLE SUBSCRIPTION PLAN ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update plan",
      });
    }

    return res.json({
      success: true,
      message: "Plan updated successfully",
    });
  });
});

module.exports = router;