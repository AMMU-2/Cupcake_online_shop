const express = require('express');
const router = express.Router();
// Importing category controller functions
const { getAllCategories, addCategory } = require('../controller/category.controller');
 
router.post('/addcategory', addCategory); // Route to add a new category
router.get('/', getAllCategories);  // Route to get all categories
 
module.exports = router;
