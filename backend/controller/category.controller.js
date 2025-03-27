const Category = require('../models/category.model');
 //adding Category
exports.addCategory = (req, res) => {
    const { categoryName } = req.body;
 
    Category.create({ categoryName })
        .then(category => res.status(201).json({ message: "Category added successfully", category }))
        .catch(error => res.status(500).json({ message: "Error adding category", error }));
};
//retriving all Category
exports.getAllCategories = (req, res) => {
    Category.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(500).json({ message: "Error fetching categories", error }));
};
