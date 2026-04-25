const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/stats", (req, res) => {
  const stats = {};

  // 1. Organizations count
  db.query("SELECT COUNT(*) AS total FROM organizations", (err, orgResult) => {
    if (err) return res.status(500).json({ error: err });

    stats.organizations = orgResult[0].total;

    // 2. Users count
    db.query("SELECT COUNT(*) AS total FROM RegCustomers", (err, userResult) => {
      if (err) return res.status(500).json({ error: err });

      stats.users = userResult[0].total;

      // 3. Active tenders count
      db.query(
        "SELECT COUNT(*) AS total FROM rfqs WHERE status = 'active'",
        (err, tenderResult) => {
          if (err) return res.status(500).json({ error: err });

          stats.activeTenders = tenderResult[0].total;

          // 4. Revenue (example)
          db.query(
            "SELECT SUM(amount) AS total FROM subscriptions",
            (err, revenueResult) => {
              if (err) return res.status(500).json({ error: err });

              stats.revenue = revenueResult[0].total || 0;

              return res.json({
                success: true,
                data: stats,
              });
            }
          );
        }
      );
    });
  });
});

module.exports = router;