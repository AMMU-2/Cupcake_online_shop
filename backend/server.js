const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
 
dotenv.config();
 
const userauthRoutes = require('./routes/userAuth.routes');
const cakeRoutes = require('./routes/cake.routes')
const categoryRoutes= require('./routes/category.routes')
const cartRoutes = require('./routes/cart.routes')
const wishRoutes = require('./routes/wishlist.route')
 
const app = express();
const PORT = process.env.PORT || 5000;
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"))
 
// Routes
app.use('/user', userauthRoutes);
app.use("/cake", cakeRoutes)
app.use("/category", categoryRoutes) 
app.use("/cart", cartRoutes) 
app.use("/wishlist", wishRoutes)

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Connection Error:", err));
 
// Start Server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 