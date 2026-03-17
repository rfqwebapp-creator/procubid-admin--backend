const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/users", verifyToken, getUsers);

module.exports = router;