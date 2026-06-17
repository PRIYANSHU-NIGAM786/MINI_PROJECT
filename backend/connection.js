const mongoose = require("mongoose");

// Hardcoded URL jaisa aapko chahiye tha
const url = "mongodb+srv://Priyanshu:1234@cluster0.ojsets1.mongodb.net/mydb?appName=Cluster0";

mongoose.connect(url)
    .then((result) => {  
        // Database connect hone par ye message aayega
        console.log("🚀 Database connected successfully!");
    })
    .catch((err) => {            
        // Agar koi error aayi, toh ye exact reason screen par dikhayega
        console.log("❌ Database connection failed!");
        console.error("Reason:", err.message);
    });

module.exports = mongoose;