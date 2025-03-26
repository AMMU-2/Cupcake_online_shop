const mongoose = require("mongoose");
 
const cakeSchema = new mongoose.Schema({
  cakeName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // This will store the image path
  categoryName:{type:String, ref:"Category", required:true}
});
 
module.exports = mongoose.model("Cake", cakeSchema);