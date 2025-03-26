const mongoose = require('mongoose');
 
const connectDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("MongoDB Connected");
                resolve();
            })
            .catch(err => {
                console.error("MongoDB Connection Error:", err);
                reject(err);
            });
    });
};
 
module.exports = connectDB;