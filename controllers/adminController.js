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



// UPDATE ROLE
const updateRole = (req, res) => {
  const { id } = req.params;
  const { name, description, module } = req.body;

  const sql = `
    UPDATE roles 
    SET name = ?, description = ?, module = ?
    WHERE id = ?
  `;

  db.query(sql, [name, description, module, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating role" });
    }

    res.json({
      success: true,
      message: "Role updated successfully"
    });
  });
};



// DELETE ROLE
const deleteRole = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM roles WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting role" });
    }

    res.json({
      success: true,
      message: "Role deleted successfully"
    });
  });
};



module.exports = { 
  deleteUser, 
  toggleUserStatus,
  updateRole,
  deleteRole
};