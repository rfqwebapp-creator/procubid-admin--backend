const express = require("express");
const router = express.Router();

const { deleteUser , toggleUserStatus } = require("../controllers/adminController");

router.delete("/delete-user/:id", deleteUser);

router.put("/toggle-user-status/:id", toggleUserStatus);

module.exports = router;