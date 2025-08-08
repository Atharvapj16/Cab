const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}




/*const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname,lastname, email, password
}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = new userModel({
        fullname: {     
            firstname,
            lastname    
        },
        email,
        password
    })
    return user;

}


// User service is to create a new user

*/