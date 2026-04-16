const express = require("express");
const router = express.Router();

const {
  getRoles,
  deleteRole,
  updateRole,
} = require("../controllers/roleController");

// GET all roles
router.get("/roles", getRoles);

// UPDATE role
router.put("/roles/:id", updateRole);

// DELETE role
router.delete("/roles/:id", deleteRole);

module.exports = router;