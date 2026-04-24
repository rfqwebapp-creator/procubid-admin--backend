const express = require("express");
const router = express.Router();

const {
  getAdminTenders,
  getTenderById,
  deleteTender,
  suspendTender,
} = require("../controllers/tenderController");

// GET all tenders
router.get("/", getAdminTenders);

// GET single tender
router.get("/:id", getTenderById);

// DELETE tender
router.delete("/:id", deleteTender);

// BLOCK / UNBLOCK tender
router.put("/:id/suspend", suspendTender);

module.exports = router;