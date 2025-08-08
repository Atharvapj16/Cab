const express=require('express');
const app=express();

const dotenv = require('dotenv');   
dotenv.config();
const cors = require('cors');
app.use(cors());  //In case of CORS  if we have domain then we can put it here for production environment
const connectToDb = require('./db/db');  // Import the database connection function
connectToDb();  // Call the function to connect to the database

const cookieParser = require('cookie-parser');  // Middleware to parse cookies
app.use(cookieParser());  // Use cookie parser middleware

const userRoutes = require('./routes/user.routes');  // Import user routes
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.use('/users', userRoutes);  // Use user routes under the /api/users path


module.exports=app;