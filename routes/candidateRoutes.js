const express = require("express");
const { getAllJobs, applyForJob, getAppliedJobs } = require("../controllers/candidateController");
const { authenticate, authorize } = require("../middlewares/auth");
const router = express.Router();

router.get("/jobs", authenticate, authorize(["candidate"]), getAllJobs);
router.post("/apply", authenticate, authorize(["candidate"]), applyForJob);
router.get("/applied", authenticate, authorize(["candidate"]), getAppliedJobs);

module.exports = router;
