
const userModel = require('../models/user.model');

const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model'); 


module.exports.registerUser = async (req, res,next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,  
        lastname: fullname.lastname,   
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();  // Generate JWT token for the user
    res.status(201).json({token,user});
}
    

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //console.log(email, password);
    
    
    const user = await userModel.findOne({ email }).select('+password');  // Select the password field to compare it later
    if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch= await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();  // Generate JWT token for the user

    res.cookie('token', token);


    res.status(200).json({ token, user });
   // console.log(user);
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);  
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');  // Clear the cookie to log out the user
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });  
    res.status(200).json({ message: 'User logged out successfully' });
}