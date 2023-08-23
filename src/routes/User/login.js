const express = require('express');
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const router = express.Router();


const User = require('../../Modal/User');
const generateTokens = require('./../../utils/genrateToken')

router.post('/login' , [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({min: 6})
] , async (req , res) => {
    const errors = validationResult(req);

        if (!errors.isEmpty() && errors?.errors[0]?.path === 'email') {
            return res.status(400).send('Invalid email address. Please try again.')
        }
        
        if(!errors?.isEmpty() && errors?.errors[0]?.path === 'password') {
            return res
            .status(400)
            .send('Password must be longer than 6 characters.')
        }
    const {email , password} = req.body;
    try{
         let user = await User.findOne({email: email.toLowerCase().trim()});
         if (!user)
            return res.status(400).json({
            message: "User Not Exist"
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
            message: "Incorrect Password !"
        });
        user = new User({ email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        res.status(201).json(await generateTokens(user))
    }catch(err){
        res.send(401).json({message : err})
    }
})

module.exports = router;