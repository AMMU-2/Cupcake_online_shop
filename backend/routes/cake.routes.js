const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { addCake, getCakes, searchCakes, viewCake, getCakesByCategory } = require("../controller/cake.controller");
 

router.post("/add", upload.single("image"), addCake);


router.get("/all", getCakes);
router.get("/search", searchCakes)
router.get("/:cakeId", viewCake)
router.get('/category/:categoryName',getCakesByCategory)
module.exports = router;