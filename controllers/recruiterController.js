const Job = require("../models/Job");
const Application = require("../models/Application");

exports.postJob = async (req, res) => {
  const { title, description } = req.body;
  try {
    const job = new Job({ title, description, recruiterId: req.user.id });
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ error: "Error posting job" });
  }
};

exports.getApplicants = async (req, res) => {
  const { jobId } = req.params;
  try {
    const applications = await Application.find({ jobId }).populate("candidateId");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applicants" });
  }
};
