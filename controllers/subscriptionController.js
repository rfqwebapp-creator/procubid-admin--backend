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

  const {
    name,
    price,
    billing,
    features,
    status,
    currency,
    discount,
  } = req.body;

  if (!name || price === undefined || price === null || price === "") {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  const numericPrice = Number(price);
  const numericDiscount = Number(discount || 0);

  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid number",
    });
  }

  if (isNaN(numericDiscount) || numericDiscount < 0) {
    return res.status(400).json({
      success: false,
      message: "Discount must be a valid positive number",
    });
  }

  let duration = "30 days";

  if (billing === "3 Months") duration = "90 days";
  else if (billing === "6 Months") duration = "180 days";
  else if (billing === "Yearly") duration = "365 days";

  const enabled = status === "Active" ? 1 : 0;

  const sql = `
    INSERT INTO subscription_plans
    (name, price, billing, duration, features, status, enabled, currency, discount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      numericPrice,
      billing || "Monthly",
      duration,
      features || "",
      status || "Active",
      enabled,
      currency || "USD",
      numericDiscount,
    ],
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

exports.updateSubscription = (req, res) => {
  const { id } = req.params;

  const {
    name,
    price,
    billing,
    features,
    status,
    currency,
    discount,
  } = req.body;

  if (!name || price === undefined || price === null || price === "") {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  const numericPrice = Number(price);
  const numericDiscount = Number(discount || 0);

  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid number",
    });
  }

  if (isNaN(numericDiscount) || numericDiscount < 0) {
    return res.status(400).json({
      success: false,
      message: "Discount must be a valid positive number",
    });
  }

  let duration = "30 days";

  if (billing === "3 Months") duration = "90 days";
  else if (billing === "6 Months") duration = "180 days";
  else if (billing === "Yearly") duration = "365 days";

  const enabled = status === "Active" ? 1 : 0;

  const sql = `
    UPDATE subscription_plans
    SET
      name = ?,
      price = ?,
      billing = ?,
      duration = ?,
      features = ?,
      status = ?,
      enabled = ?,
      currency = ?,
      discount = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name,
      numericPrice,
      billing || "Monthly",
      duration,
      features || "",
      status || "Active",
      enabled,
      currency || "USD",
      numericDiscount,
      id,
    ],
    (err) => {
      if (err) {
        console.error("UPDATE SUBSCRIPTION ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update subscription",
        });
      }

      return res.json({
        success: true,
        message: "Plan updated successfully",
      });
    }
  );
};

exports.toggleSubscription = (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  const status = Number(enabled) === 1 ? "Active" : "Inactive";

  const sql = `
    UPDATE subscription_plans
    SET enabled = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [Number(enabled) === 1 ? 1 : 0, status, id], (err) => {
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