const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/stats", async (req, res) => {
  try {
    const stats = {
      organizations: 0,
      activeUsers: 0,
      openTenders: 0,
      totalRevenue: 50000,
    };

    const [org] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM organizations"
    );
    stats.organizations = org[0].count;

    const [users] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM RegCustomers"
    );
    stats.activeUsers = users[0].count;

    const [tenders] = await db.promise().query(
      "SELECT COUNT(*) AS count FROM rfqs"
    );
    stats.openTenders = tenders[0].count;

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

router.get("/charts", async (req, res) => {
  try {
    const [tenderRows] = await db.promise().query(`
      SELECT 
        DATE_FORMAT(COALESCE(created_at, NOW()), '%b') AS month,
        MONTH(COALESCE(created_at, NOW())) AS month_no,
        COUNT(*) AS tenders,
        COUNT(*) AS transactions
      FROM rfqs
      GROUP BY month_no, month
      ORDER BY month_no
    `);

    const tenderData = tenderRows.map((row) => ({
      month: row.month,
      tenders: Number(row.tenders || 0),
      transactions: Number(row.transactions || 0),
    }));

    const revenueData = tenderRows.map((row) => ({
      month: row.month,
      revenue: 50000,
    }));

    res.json({
      success: true,
      tenderData,
      revenueData,
    });
  } catch (error) {
    console.error("Dashboard charts error:", error);

    res.json({
      success: true,
      tenderData: [],
      revenueData: [],
    });
  }
});

module.exports = router;