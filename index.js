const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const InitiateMongoServer = require('./src/db')
require('dotenv').config()

const signup = require('./src/routes/User/signup');
const login = require('./src/routes/User/login');
const refreshAccessToken = require('./src/routes/User/refreshAccessToken');
const allUserList = require('./src/routes/allUserList/allUserList');

InitiateMongoServer();
const app = express();
let cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cors({
	origin: 'http://localhost:3000',
}));
app.use(cookieParser())

app.get('/' , (req  , res) =>  {
    
    res.json({message : "I working"})
}) 
app.get('/te' , (req  , res) =>  {  
    console.log(req,  "sss33sssssss");
    // res.json({message : "te"})
}) 


app.use(signup);
app.use(login);
app.use(refreshAccessToken);
app.use(allUserList);

app.listen(process.env.PORT ,  (req , res) => {
    console.log(`server is runnnnnnnnnnnnnnung up ${process.env.PORT}`)
})