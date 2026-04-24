// controllers/dashboardController.js
const db = require("../config/db");

exports.getDashboardStats = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM organizations) AS organizations,
      (SELECT COUNT(*) FROM RegCustomers) AS activeUsers,
      (SELECT COUNT(*) FROM rfqs WHERE status NOT IN ('CANCELLED', 'CLOSED')) AS openTenders,
      0 AS totalRevenue
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("DASHBOARD STATS ERROR:", err);
      return res.status(500).json({ success: false, message: "Failed to load stats" });
    }

    res.json({ success: true, data: rows[0] });
  });
};

exports.getDashboardCharts = (req, res) => {
  const sql = `
    SELECT
      DATE_FORMAT(created_at, '%b') AS month,
      COUNT(*) AS tenders
    FROM rfqs
    GROUP BY DATE_FORMAT(created_at, '%b'), MONTH(created_at)
    ORDER BY MONTH(created_at)
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("DASHBOARD CHART ERROR:", err);
      return res.status(500).json({ success: false, message: "Failed to load charts" });
    }

    res.json({ success: true, data: rows });
  });
};