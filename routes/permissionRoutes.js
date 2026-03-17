const express = require("express");
const router = express.Router();

const { getPermissions, getRolePermissions } = require("../controllers/permissionController");

router.get("/permissions", getPermissions);

router.get("/role-permissions", getRolePermissions);

module.exports = router;