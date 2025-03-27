const express = require('express');
// Importing user authentication controller functions
const { register, login,getUserProfile ,update,deleteUser, logout} = require('../controller/userAuth.controller');

// Middleware for authentication and token verification
const authMiddleware = require('../middleware/authMiddleware');
 
const router = express.Router();
 
router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login
router.get('/profile/:id', getUserProfile); // Route to get user profile by ID
router.put('/update/:id',update); // Route to update user details
router.delete('/delete', deleteUser); // Route to delete a user account
router.post('/logout', authMiddleware,logout) // Route to log out the user
 
module.exports = router;
 
