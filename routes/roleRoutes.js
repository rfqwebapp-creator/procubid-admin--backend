const express = require("express");
const router = express.Router();

const { 
  getRoles,
  deleteRole,
  updateRole
} = require("../controllers/roleController");

// GET all roles
router.get("/roles", getRoles);

// DELETE role
router.delete("/roles/:id", deleteRole);

// UPDATE role
router.put("/roles/:id", updateRole);

module.exports = router;