const express = require("express");
const router = express.Router();

const { deleteUser , toggleUserStatus,updateRole,deleteRole } = require("../controllers/adminController");

router.delete("/delete-user/:id", deleteUser);

router.put("/toggle-user-status/:id", toggleUserStatus);

router.put("/api/admin/update-role/:id", updateRole);
router.delete("/api/admin/delete-role/:id", deleteRole);

module.exports = router;