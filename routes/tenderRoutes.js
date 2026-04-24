const express = require("express");
const router = express.Router();

const {
  getAdminTenders,
  deleteTender,
  suspendTender,
} = require("../controllers/tenderController");

// GET all tenders for admin
router.get("/", getAdminTenders);

router.get("/:id", getTenderById);

// DELETE RFQ
router.delete("/:id", deleteTender);

// SUSPEND / UNBLOCK RFQ
router.put("/:id/suspend", suspendTender);

module.exports = router;