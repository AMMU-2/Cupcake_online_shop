const jwt = require('jsonwebtoken');
 
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
 
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }
 
    jwt.verify(token, process.env.JWT_SECRET)
        .then(decoded => {
            req.user = decoded; 
            next(); 
        })
        .catch(() => {
            res.status(400).json({ message: "Invalid Token" });
        });
};
 
module.exports = authenticateUser;