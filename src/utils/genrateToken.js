
const jwt = require('jsonwebtoken')

const generateTokens = async (user) => {
    try{
        const accessToken = jwt.sign(
            {id : user.id ,email : user.email },
            process.env.JWT_STRING,
            {
                expiresIn : '1m'
            }
        );
        const refreshToken = jwt.sign(
            {id : user.id , email : user.email},
            process.env.JWT_STRING,
            {
                expiresIn : '40m'
            }
        )
        return {accessToken,refreshToken};
    }catch(err){
       throw new err
    }
}

module.exports = generateTokens