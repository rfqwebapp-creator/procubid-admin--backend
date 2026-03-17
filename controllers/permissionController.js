const db = require("../config/db");

exports.getPermissions = (req, res) => {

  const sql = "SELECT * FROM permissions";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

exports.getRolePermissions = (req, res) => {

  const sql = `
  SELECT 
  permissions.name AS permission,
  permissions.module,
  GROUP_CONCAT(roles.name) AS assigned_roles
  FROM role_permissions
  JOIN roles ON roles.id = role_permissions.role_id
  JOIN permissions ON permissions.id = role_permissions.permission_id
  GROUP BY permissions.id
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};