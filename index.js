// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const candidateRoutes = require("./routes/candidateRoutes");
// const recruiterRoutes = require("./routes/recruiterRoutes");

// const app = express();


// app.use(express.json());


// connectDB();


// app.use("/api/auth", authRoutes);
// app.use("/api/candidate", candidateRoutes);
// app.use("/api/recruiter", recruiterRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/recruiter", recruiterRoutes);


app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
