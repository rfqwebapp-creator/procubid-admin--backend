const db = require("../config/db");

exports.getUsers = (req, res) => {

const sql = "SELECT * FROM users";

db.query(sql, (err, result) => {

if (err) {
return res.status(500).json(err);
}

res.json(result);

});

};

exports.toggleUserStatus = (req, res) => {
  const userId = req.params.id;

  // Get current status first
  const checkSql = "SELECT status FROM users WHERE id = ?";

  db.query(checkSql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentStatus = result[0].status;
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

    // Update status
    const updateSql = "UPDATE users SET status = ? WHERE id = ?";

    db.query(updateSql, [newStatus, userId], (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: "User status updated", status: newStatus });
    });
  });
};