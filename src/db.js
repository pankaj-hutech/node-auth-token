const mongoose = require('mongoose');

const InitmongoServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true
        });
        console.log("Connected to mongo server");
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = InitmongoServer;