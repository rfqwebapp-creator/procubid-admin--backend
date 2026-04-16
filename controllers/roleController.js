const db = require("../config/db");

// ================= GET ROLES =================
exports.getRoles = (req, res) => {
  const sql = "SELECT * FROM roles ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET ROLES ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    const formatted = result.map((role) => {
      let parsedPermissions = [];
      let parsedFieldPermissions = [];

      try {
        parsedPermissions =
          typeof role.permissions === "string"
            ? JSON.parse(role.permissions)
            : role.permissions || [];
      } catch {
        parsedPermissions = [];
      }

      try {
        parsedFieldPermissions =
          typeof role.field_permissions === "string"
            ? JSON.parse(role.field_permissions)
            : role.field_permissions || [];
      } catch {
        parsedFieldPermissions = [];
      }

      return {
        ...role,
        permissions: parsedPermissions,
        field_permissions: parsedFieldPermissions,
      };
    });

    res.json(formatted);
  });
};

// ================= DELETE ROLE =================
exports.deleteRole = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM roles WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("DELETE ROLE ERROR:", err);
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
  let { name, description, permissions, field_permissions } = req.body;

  // 🔥 FIX: Ensure permissions is array
  if (typeof permissions === "string") {
    try {
      permissions = JSON.parse(permissions);
    } catch {
      permissions = [];
    }
  }

  // 🔥 FIX: Ensure field_permissions is array
  if (typeof field_permissions === "string") {
    try {
      field_permissions = JSON.parse(field_permissions);
    } catch {
      field_permissions = [];
    }
  }

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
    (err) => {
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