const express = require("express");
const router = express.Router();

const { getUsers, toggleUserStatus } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/users", verifyToken, getUsers);
router.put("/users/:id/toggle-status", verifyToken, toggleUserStatus);

module.exports = router;