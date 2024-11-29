const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const uri = "mongodb://localhost:27017/task";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
