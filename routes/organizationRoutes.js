const express = require("express");
const router = express.Router();
const {
  getOrganizations,
  addOrganization,
  getOrganizationDetails,
} = require("../controllers/organizationController");

router.get("/", getOrganizations);
router.post("/add", addOrganization);
router.get("/:id/details", getOrganizationDetails);

module.exports = router;