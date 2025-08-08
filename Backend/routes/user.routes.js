
const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware'); 

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)


router.get('/profile',authMiddleware.authUser,userController.getUserProfile);  
router.get('/logout', authMiddleware.authUser,userController.logoutUser);  // Logout user

module.exports = router;







/*

const express = require('express');
const router = express.Router();

const { body }= require('express-validator');  /// why we used this
const userController = require('../controllers/user.controller');


router.post('/register',[
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
],
userController.registerUser
)


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
  userController.loginUser
)
  
router.get('/profile',authMiddleware.authUser,userController.getUserProfile);  
router.get('/logout', authMiddleware.authUser,userController.logoutUser);  // Logout user

module.exports = router;

*/