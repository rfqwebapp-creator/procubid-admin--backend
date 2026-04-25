const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/stats", async (req, res) => {
  try {
    const stats = {
      organizations: 0,
      activeUsers: 0,
      openTenders: 0,
      totalRevenue: 0,
    };

    // Organizations
    const [org] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM organizations"
    );
    stats.organizations = org[0].count;

    // Users
    const [users] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM RegCustomers"
    );
    stats.activeUsers = users[0].count;

    // Tenders
    const [tenders] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM rfqs"
    );
    stats.openTenders = tenders[0].count;

    // Revenue (optional table)
    try {
      const [rev] = await db.promise().query(
        "SELECT SUM(amount) AS total FROM subscriptions"
      );
      stats.totalRevenue = rev[0].total || 0;
    } catch (err) {
      console.log("Revenue table not found, skipping...");
    }

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Dashboard ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Dashboard failed",
    });
  }
});

router.get("/charts", (req, res) => {
  res.json({
    success: true,
    tenderData: [],
    revenueData: [],
  });
});

module.exports = router;