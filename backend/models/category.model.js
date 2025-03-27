const mongoose = require("mongoose");
 //defing the categorySchema
const categorySchema = new mongoose.Schema({
  // cakeId: { type: String, required: true, unique: true },
  categoryName:{type:String, required:true}
});
 
module.exports = mongoose.model("Category", categorySchema);
