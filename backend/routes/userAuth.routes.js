const express = require('express');
const { register, login,getUserProfile ,update,deleteUser, logout} = require('../controller/userAuth.controller');
const authMiddleware = require('../middleware/authMiddleware')
 
const router = express.Router();
 
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getUserProfile); 
router.put('/update/:id',update);
router.delete('/delete', deleteUser);
router.post('/logout', authMiddleware,logout)
 
module.exports = router;
 