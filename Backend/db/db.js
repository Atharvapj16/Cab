
const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}
    

module.exports = connectToDb;
// This function can be called in the server.js file to establish a connection to the database when the server starts.
