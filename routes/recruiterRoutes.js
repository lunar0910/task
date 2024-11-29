const express = require("express");
const { postJob, getApplicants } = require("../controllers/recruiterController");
const { authenticate, authorize } = require("../middlewares/auth");
const router = express.Router();

router.post("/jobs", authenticate, authorize(["recruiter"]), postJob);
router.get("/jobs/:jobId/applicants", authenticate, authorize(["recruiter"]), getApplicants);

module.exports = router;
