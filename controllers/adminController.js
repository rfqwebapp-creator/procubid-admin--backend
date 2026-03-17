const db = require("../config/db");

// DELETE USER
const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  });
};




// BLOCK / UNBLOCK USER
const toggleUserStatus = (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE users
    SET status = IF(status='Active','Blocked','Active')
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Error updating status" });
    }

    res.json({
      success: true,
      message: "User status updated"
    });

  });

};

module.exports = { deleteUser, toggleUserStatus };