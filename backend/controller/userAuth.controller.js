
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 

exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, address } = req.body;
 
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone, address });
 
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name, email, phone, address }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
 
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
 

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, phone, address, password } = req.body;
 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
 
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
 
        await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
 
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 

exports.logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
};
 