const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator')
const router = express.Router();
const generateTokens = require('../../utils/genrateToken');
let cookieParser = require("cookie-parser");
let app = express();
app.use(cookieParser());


const User = require('../../Modal/User');

router.post("/signup" , 
       body('email').isEmail(),
       body('password').isLength({min: 1}), 
       async (req , res) => {
         const errors = validationResult(req.body);
        const {email , password} = req.body;
        try{
            if (!errors.isEmpty() && errors?.errors[0]?.path === 'email') {
                return res.status(400).send('Invalid email address. Please try again.')
            }
            
            if(!errors?.isEmpty() && errors?.errors[0]?.path === 'password') {
                return res
                .status(400)
                .send('Password must be longer than 6 characters.')
            }
            let user = await User.findOne({
                email : email.toLowerCase().trim()
            })
            if(user) {
                return res.status(400).json({
                    message : 'user is already exists'
                })
            }
            user = new User({ email : email.toLowerCase().trim(), password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password , salt);
            await user.save();
            // res.redirect('/login');
            res.cookie('csrf_token', "token" , {expires : new Date(Date.now() + 5000) , httpOnly : false}).status(201).json(await generateTokens(user))
        }catch(err){
            console.log(err);
            res.status(500).send('Error  in signup')
        }
    }) 
  
module.exports = router;