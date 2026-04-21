const express = require("express");
const router = express.Router();

const {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  toggleSubscription,
} = require("../controllers/subscriptionController");

router.get("/", getSubscriptions);
router.post("/add", addSubscription);
router.put("/:id", updateSubscription);
router.patch("/:id/toggle", toggleSubscription);

module.exports = router;