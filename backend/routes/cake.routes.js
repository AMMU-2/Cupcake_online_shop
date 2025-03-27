const express = require("express");
const router = express.Router();
// Middleware for handling file uploads (image uploads for cakes)
const upload = require("../middleware/upload.middleware");
// Importing cake controller functions
const { addCake, getCakes, searchCakes, viewCake, getCakesByCategory } = require("../controller/cake.controller");
 
// Route for adding a new cake
router.post("/add", upload.single("image"), addCake);


router.get("/all", getCakes);// Route to get all available cakes
router.get("/search", searchCakes); // Route to search for cakes by name or description
router.get("/:cakeId", viewCake); // Route to view a specific cake by its ID
router.get('/category/:categoryName',getCakesByCategory); // Route to get cakes by category

module.exports = router;
