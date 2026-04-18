const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  console.log("Attempting to connect to MongoDB Atlas...");
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`✅ SUCCESS: Connected to MongoDB cluster at ${conn.connection.host}`);
    console.log(`Database selected: ${conn.connection.name}`);
    await mongoose.disconnect();
    console.log("Connection closed perfectly.");
  } catch (error) {
    console.error("❌ ERROR connecting to MongoDB Atlas:");
    console.error(error.message);
    if (error.message.includes("bad auth")) {
       console.error("Hint: Username or password is incorrect.");
    }
  }
}

testConnection();
