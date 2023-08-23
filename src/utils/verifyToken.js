const jwt  = require('jsonwebtoken');
const User = require('../Modal/User'); 
const generateTokens = require('./genrateToken');


const verifyToken =  (token) => {
    return new Promise((resolve , rejects) => {
         jwt.verify(token,process.env.JWT_STRING ,  (err ,tokenDetails)=> {
            if(err){
                rejects({message : 'Invalid refresh token'})
            }else{
                const findUser =  User.findOne({email : tokenDetails.email})
                resolve(generateTokens(findUser))
            }
        })
    })
}

module.exports = verifyToken;