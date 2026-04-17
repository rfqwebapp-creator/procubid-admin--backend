const db = require("../config/db");

exports.getSubscriptions = (req, res) => {
  const sql = "SELECT * FROM subscription_plans ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET SUBSCRIPTIONS ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch subscriptions",
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  });
};

exports.addSubscription = (req, res) => {
  console.log("ADD SUBSCRIPTION BODY:", req.body);

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
        console.error("ADD SUBSCRIPTION ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add subscription",
        });
      }

      return res.json({
        success: true,
        message: "Plan created successfully",
        id: result.insertId,
      });
    }
  );
};

exports.toggleSubscription = (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  const status = enabled ? "Active" : "Inactive";

  const sql = `
    UPDATE subscription_plans
    SET enabled = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [enabled ? 1 : 0, status, id], (err) => {
    if (err) {
      console.error("TOGGLE SUBSCRIPTION ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update subscription",
      });
    }

    return res.json({
      success: true,
      message: "Subscription updated successfully",
    });
  });
};