const express = require("express");
const router = express.Router();

const { loginAdmin, adminData } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", loginAdmin);
router.get("/admin-data", verifyToken, adminData);

module.exports = router;