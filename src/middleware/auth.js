const jwt = require('jsonwebtoken');

const authGurdToken = async (req , res , next) => {
    const token = req?.headers['authentication']?.split(' ')?.[1];
    if(!token){
        return  res.status(401).send("inVlaid Token");
    }
    try{
        jwt.verify(token , process.env.JWT_STRING);
        return next();
    }catch(err){
        res.status(401)
        return  res.status(401).send("inVlaid Token");
    }
}

module.exports = authGurdToken;