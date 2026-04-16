const db = require("../config/db");

// ================= GET ROLES =================
exports.getRoles = (req, res) => {
  const sql = "SELECT * FROM roles ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET ROLES ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    const formatted = result.map((role) => ({
      ...role,
      permissions:
        typeof role.permissions === "string"
          ? JSON.parse(role.permissions)
          : role.permissions,
      field_permissions:
        typeof role.field_permissions === "string"
          ? JSON.parse(role.field_permissions)
          : role.field_permissions,
    }));

    res.json(formatted);
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
      message: "Role deleted successfully",
    });
  });
};

// ================= UPDATE ROLE =================
exports.updateRole = (req, res) => {
  console.log("REQ BODY:", req.body);

  const { id } = req.params;
  const { name, description, permissions, field_permissions } = req.body;

  const sql = `
    UPDATE roles
    SET name = ?, description = ?, permissions = ?, field_permissions = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name || "",
      description || "",
      JSON.stringify(permissions || []),
      JSON.stringify(field_permissions || []),
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("UPDATE ROLE ERROR:", err);
        return res.status(500).json({ message: "Update error" });
      }

      res.json({
        success: true,
        message: "Role updated successfully",
      });
    }
  );
};