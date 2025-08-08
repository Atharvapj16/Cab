const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  // Importing jsonwebtoken for token generation

const userSchema = new mongoose.Schema({
    fullname: {
     firstname:{
        type:String,
        required:true,
        minlength:[3, 'First name must be at least 3 characters long']
     },

     lastname:{
        type:String,
        minlength:[3, 'Last name must be at least 3 characters long']
     }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5, 'Email must be at least 5 characters long']
    },

    password:{
        type:String,
        required:true,
        //select:false,  // This will prevent the password from being returned in queries
    },

    socketId:{  // This field can be used to store the socket ID for real-time tracking of driver and customer
        type:String,    
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{ expiresIn: '24h' });
    //const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Optional: Set an expiration time for the token
    return token;   
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);  // Hashing the password with a salt rounds of 10
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;  // Exporting the user model to be used in other parts of the application

