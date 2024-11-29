const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const sendEmail = require("../config/mailer");
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    
    const application = new Application({ jobId, candidateId: req.user.id });

   
    await application.save();

    
    const job = await Job.findById(jobId);
    const candidate = await User.findById(req.user.id); 

    if (!job || !candidate) {
      return res.status(404).json({ message: 'Job or candidate not found' });
    }


    const recruiter = await User.findById(job.recruiterId);

   
    const subject = `Job Application for ${job.title}`;
    const textToCandidate = `Dear ${candidate.name},\n\nYou have successfully applied for the job: ${job.title} at ${job.company}. We will notify you about the next steps.`;
    const textToRecruiter = `Dear ${recruiter.name},\n\nYou have a new job application from ${candidate.name} for the job: ${job.title} at ${job.company}.`;

  
    await sendEmail(candidate.email, subject, textToCandidate);

   
    await sendEmail(recruiter.email, subject, textToRecruiter);

    res.status(201).json({ message: "Application submitted successfully, emails sent to candidate and recruiter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error applying for job" });
  }
};


exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user.id }).populate("jobId");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applied jobs" });
  }
};
