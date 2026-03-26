const db = require("../config/db");

// ================= GET ROLES =================
exports.getRoles = (req, res) => {

  const sql = "SELECT * FROM roles";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });

};

// ================= DELETE ROLE =================
exports.deleteRole = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM roles WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Delete error" });
    }

    res.json({
      success: true,
      message: "Role deleted successfully"
    });

  });

};

// ================= UPDATE ROLE =================
exports.updateRole = (req, res) => {

  console.log("REQ BODY:", req.body);
  const { id } = req.params;
  const { name, description, modules, permissions } = req.body;

 const sql = `
  UPDATE roles 
  SET name = ?, description = ?, modules = ?, permissions = ?
  WHERE id = ?
`;

  db.query(
    sql,
   [
  name || "",
      description || "",
      modules || "",
      permissions || "",
      id
],
    (err, result) => {
      if (err) {
        console.error("SQL ERROR:", err);
        return res.status(500).json({ message: "Update error" });
      }
      

      res.json({
        success: true,
        message: "Role updated successfully"
      });
    }
  );
};