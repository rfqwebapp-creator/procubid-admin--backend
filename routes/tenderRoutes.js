const express = require("express");
const router = express.Router();
const { getAdminTenders } = require("../controllers/tenderController");

// GET all tenders for admin
router.get("/", getAdminTenders);

module.exports = router;