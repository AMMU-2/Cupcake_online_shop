const Cake = require("../models/cake.model");
const Category = require("../models/category.model");
const mongoose = require('mongoose');
 
//Adding a New Cake
exports.addCake = (req, res) => {
    const { cakeName, description, price, categoryName } = req.body;
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
  
    if (!imagePath) {
       res.status(400).json({ message: "Image upload failed!" });
       return
    } 
    const newCake = new Cake({
        cakeName,
        description,
        price,
        image: imagePath,
        categoryName: categoryName
    });
    newCake.save()
        .then((cake) => res.status(201).json({ message: "Cake added successfully!", cake }))
        .catch((error) => res.status(500).json({ message: "Error adding cake", error }));
}
// Fetching All Cakes- home page
exports.getCakes = (req, res) => {
  Cake.find()
    .then((cakes) =>{
        res.status(200).json(cakes)
    })
    .catch((error) => res.status(500).json({ message: "Error fetching cakes", error }));
};
//Searching Cakes by Name
exports.searchCakes = (req, res) => {
    const { query } = req.query; 
 
    console.log("Received search query:", query);
 
    if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
    }
 
    Cake.find({ cakeName: { $regex: query, $options: "i" } }) 
        .then((cakes) => {
            if (cakes.length === 0) {
                return res.status(404).json({ message: "No cakes found" });
            }
            res.status(200).json({ data: cakes }); 
        })
        .catch((error) => {
            console.error("Search error:", error);
            res.status(500).json({ message: "Server error", error });
        });
};
//Get a Cake by ID-veiw page
exports.viewCake=(req,res)=>{
  const { id } = req.params;
 
    Cake.findOne({ id })
        .then(cake => {
            if (!cake) {
                return res.status(404).json({ message: "Cake not found" });
            }
            res.status(200).json({
                id:cake._id,
                cakeName: cake.cakeName,
                description: cake.description,
                price: cake.price
            });
        })
        .catch(error => {
            res.status(500).json({ message: "Server error", error });
        });
}

 
exports.getCakesByCategory = (req, res) => {
    const categoryName = req.params.categoryName;
 
    Cake.find({ categoryName: categoryName })
        .then(cakes => {
            if (cakes.length === 0) {
                return res.status(404).json({ message: "No cakes found in this category" });
            }
            res.status(200).json(cakes);
        })
        .catch(error => res.status(500).json({ message: "Error fetching cakes", error }));
};
 
