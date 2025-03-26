const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory } = require('../controller/category.controller');
 
router.post('/addcategory', addCategory)
router.get('/', getAllCategories);
 
module.exports = router;