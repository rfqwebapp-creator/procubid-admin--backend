const db = require("../config/db");

// GET ALL RegCustomers
exports.getUsers = (req, res) => {
  const sql = `
    SELECT 
      id,
      firstname,
      lastname,
      email,
      phone,
      country,
      industry,
      worknumber,
      gst,
      companyname,
      referralcode,
      status
    FROM RegCustomers
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("GET USERS ERROR:", err);
      return res.status(500).json(err);
    }

    const formattedUsers = result.map((user) => ({
      id: user.id,
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      email: user.email || "",
      phone: user.phone || "",
      country: user.country || "",
      industry: user.industry || "",
      worknumber: user.worknumber || "",
      gst: user.gst || "",
      companyname: user.companyname || "",
      referralcode: user.referralcode || "",
      role: "Customer",
      organization: user.companyname || "-",
      status: user.status || "Active",
      last_login: "-"
    }));

    res.json(formattedUsers);
  });
};

// BLOCK / UNBLOCK USER
exports.toggleUserStatus = (req, res) => {
  const userId = req.params.id;

  const checkSql = "SELECT status FROM RegCustomers WHERE id = ?";

  db.query(checkSql, [userId], (err, result) => {
    if (err) {
      console.log("CHECK STATUS ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentStatus = result[0].status || "Active";
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

    const updateSql = "UPDATE RegCustomers SET status = ? WHERE id = ?";

    db.query(updateSql, [newStatus, userId], (err) => {
      if (err) {
        console.log("UPDATE STATUS ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "User status updated",
        status: newStatus
      });
    });
  });
};

// DELETE USER
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  const deleteSql = "DELETE FROM RegCustomers WHERE id = ?";

  db.query(deleteSql, [userId], (err, result) => {
    if (err) {
      console.log("DELETE USER ERROR:", err);
      return res.status(500).json(err);
    }

    res.json({
      message: "User deleted successfully"
    });
  });
};


// Previous code for reference (before refactoring to RegCustomers table)

// const db = require("../config/db");


// exports.getUsers = (req, res) => {

// const sql = "SELECT * FROM users";

// db.query(sql, (err, result) => {

// if (err) {
// return res.status(500).json(err);
// }

// res.json(result);

// });

// };

// exports.toggleUserStatus = (req, res) => {
//   const userId = req.params.id;

//   // Get current status first
//   const checkSql = "SELECT status FROM users WHERE id = ?";

//   db.query(checkSql, [userId], (err, result) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const currentStatus = result[0].status;
//     const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

//     // Update status
//     const updateSql = "UPDATE users SET status = ? WHERE id = ?";

//     db.query(updateSql, [newStatus, userId], (err) => {
//       if (err) {
//         return res.status(500).json(err);
//       }

//       res.json({ message: "User status updated", status: newStatus });
//     });
//   });
// };