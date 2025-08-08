const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  
const blacklistTokenModel = require('../models/blacklistToken.model'); 

module.exports.authUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];  
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token:token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using the secret key
        const user = await userModel.findById(decoded._id);  // Find the user by ID from the decoded token
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;  // Attach the user to the request object for further use
        return next();  // Call the next middleware or route handler

    }
    catch(err){
        return res.status(400).json({ message: 'Invalid token' });
    }
}